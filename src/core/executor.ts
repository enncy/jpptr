import { Page } from "puppeteer-core";
import { Parser } from "../parser";
import { ModuleRegister } from "./register";

import { Action, Context, Variables } from "./types";
import { Walker, WalkerEvents } from "./walker";

export interface ActionExecutorEvents<T extends Action> extends WalkerEvents<T> {
    executestart: Context<T>;
    parsestart: Context<T>;
    executefinish: Context<T>;
    parsefinish: Context<T>;
}

export interface ActionExecutorOptions<T extends Action> {
    page?: Page;
    variables?: Variables;
    actions?: T[];
    register?: ModuleRegister;
}

export class ActionExecutor<T extends Action> extends Walker<Context<T>> {
    public parser: Parser;
    public register: ModuleRegister;
    public variables: Variables;
    private currentContext?: Context<T>;

    constructor(options?: ActionExecutorOptions<T>) {
        super();
        /** 初始化任务，如果不存在任务，则必须使用 addActions 添加 */
        if (options) {
            const { page, actions } = options;
            if (page) {
                this.addActions(actions || [], {
                    browser: page.browser(),
                    page,
                    frame: page.mainFrame(),
                } as Context<T>);
            }
        }
        const ctx = this.peek(0);
        if (ctx) this.currentContext = ctx;

        this.variables = options?.variables || {};
        /** 初始化注册器 */
        this.register = options?.register || new ModuleRegister();
        /** 初始化动作解析器 */
        this.parser = new Parser(this.register.parser);
    }

    on<E extends keyof ActionExecutorEvents<T>>(event: E, handler: (value: ActionExecutorEvents<T>[E]) => void) {
        return super.on(event, handler);
    }
    once<E extends keyof ActionExecutorEvents<T>>(event: E, handler: (value: ActionExecutorEvents<T>[E]) => void) {
        return super.once(event, handler);
    }
    off<E extends keyof ActionExecutorEvents<T>>(event: E, handler: (value: ActionExecutorEvents<T>[E]) => void) {
        return super.off(event, handler);
    }
    emit<E extends keyof ActionExecutorEvents<T>>(event: E, value: ActionExecutorEvents<T>[E]): boolean {
        return super.emit(event, value);
    }

    context() {
        return this.currentContext;
    }
    ctx() {
        return this.context();
    }

    /**
     * 执行插件，并调用 walk 使自身事件步数自增
     */
    async execute() {
        let ctx = await this.walk();
        if (ctx) {
            this.emit("executestart", ctx);
            this.emit("parsestart", ctx);
            ctx.action = this.parser.parse({ variables: this.variables, action: ctx.action });
            this.emit("parsefinish", ctx);
            this.currentContext = ctx;

            if (ctx.action && !Array.isArray(ctx.action)) {
                /** 执行插件 ， 并处理返回值 */
                const plugin = this.register.plugin.get(ctx.action.use);
                if (plugin) {
                    const result = await plugin(ctx);
                    this.emit("executefinish", ctx);
                    if (result) {
                        if (Array.isArray(result)) {
                            ctx.action.actions = result;
                        } else {
                            ctx = Object.assign({}, ctx, result);
                        }
                    }
                }

                /** 执行 actions 子事件 */
                if (!Array.isArray(ctx.action) && ctx.action.actions) {
                    this.addActions(ctx.action.actions, ctx);
                }
            }
        }
    }

    /** 添加事件 */
    public addActions(actions: any[], ctx?: Omit<Context<T>, "action">) {
        const { page, browser, frame } = ctx || {};
        this.add(
            ...actions.map(
                (a) =>
                    ({
                        page,
                        browser,
                        frame,
                        action: a,
                    } as Context<T>)
            )
        );
    }

    /** 执行全部 */
    public async executeAll() {
        while (!this.end()) {
            await this.execute();
        }
    }
}

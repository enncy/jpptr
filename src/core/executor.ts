import { Page } from "puppeteer-core";
import { Parser } from "../parser/Parser";
import { ModuleRegister } from "./register";

import { Action, Context, Variables } from "./types";
import { Walker, WalkerEvents } from "./walker";

export interface ActionExecutorEvents<T extends Action> extends WalkerEvents<T> {
    executestart: Context<T>;
    parsestart: Context<T>;
    parsefinish: Context<T>;
    executefinish: Context<T>;
    executeerror: Context<T>;
}

export interface ActionExecutorOptions<T extends Action> {
    page?: Page;
    variables?: Variables;
    actions?: T[];
    register?: ModuleRegister;
}

/**
 * executor of action
 * 
 * @see Walker
 */
export class ActionExecutor<T extends Action> extends Walker<Context<T>> {
    public parser: Parser;
    public register: ModuleRegister;
    public variables: Variables;
    private currentContext?: Context<T>;

    constructor(options?: ActionExecutorOptions<T>) {
        super();
        /** 初始化注册器 */
        this.register = options?.register || new ModuleRegister();
        /** 初始化动作解析器 */
        this.parser = new Parser(this.register.parser);
        /** 初始化变量池 */
        this.variables = options?.variables || {};

        /** 初始化任务，如果不存在任务，则必须使用 addActions 添加 */
        if (options) {
            const { page, actions } = options;
            if (page) {
                this.addActions(actions || [], {
                    browser: page.browser(),
                    page,
                    frame: page.mainFrame(),
                    variables: this.variables,
                } as Context<T>);
            }
        }

        const ctx = this.peek(0);
        if (ctx) this.currentContext = ctx;
    }

    on<E extends keyof ActionExecutorEvents<T>>(
        event: E,
        handler: (value: ActionExecutorEvents<T>[E], ...args: any[]) => void
    ) {
        return super.on(event, handler);
    }
    once<E extends keyof ActionExecutorEvents<T>>(
        event: E,
        handler: (value: ActionExecutorEvents<T>[E], ...args: any[]) => void
    ) {
        return super.once(event, handler);
    }
    off<E extends keyof ActionExecutorEvents<T>>(
        event: E,
        handler: (value: ActionExecutorEvents<T>[E], ...args: any[]) => void
    ) {
        return super.off(event, handler);
    }

    emit<E extends keyof ActionExecutorEvents<T>>(
        event: E,
        value: ActionExecutorEvents<T>[E],
        ...args: any[]
    ): boolean {
        return super.emit(event, value, args);
    }

    /**
     * @returns current {@link Context}
     */
    context() {
        return this.currentContext;
    }
    /**
     * same as function {@link context}
     */
    ctx() {
        return this.context();
    }

    /**
     * execute the plugin and call `walk()` to increase the number of action steps,
     *
     * and resolve child actions
     *
     * @example
     * ```ts
     *
     * ;(async ()=>{
     *
     * const jpptr = Jpptr.from("./test.json")
     *
     * const executor = await jpptr.createExecutor({
     *      // cover all the actions
     *      actions:[{"user":"function","name":"goto","args":["https://example.com"]}]
     * })
     *
     * await executor.execute() // goto https://example.com
     *
     * })()
     *
     *
     *
     * ```
     *
     */
    async execute() {
        let ctx = await this.walk();
        if (ctx) {
            try {
                this.currentContext = ctx;
                this.emit("executestart", ctx);
                this.emit("parsestart", ctx);
                ctx.action = this.parser.parse(ctx);
                this.emit("parsefinish", ctx);

                if (ctx.action && !Array.isArray(ctx.action) && ctx.action.use) {
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
            } catch (e) {
                this.emit("executeerror", ctx, e);
            }
        }
    }

    /**
     * add actions
     */
    public addActions(actions: any[], ctx?: Omit<Context<T>, "action">) {
        this.add(
            ...actions.map(
                (a) =>
                    ({
                        ...ctx,
                        action: a,
                    } as Context<T>)
            )
        );
    }

    /**
     * execute all the actions
     *
     *
     * ```ts
     * while (!executor.end()) {
     *      await executor.execute();
     * }
     * ```
     * @see end
     * @see execute
     */
    public async executeAll() {
        while (!this.end()) {
            await this.execute();
        }
    }
}

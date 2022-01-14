import { Page } from "puppeteer-core";
import { PluginFunction } from "..";
import { Parser, ParserFunction } from "../parser";
import { ActionContext, Action } from "../plugins";
import { Register } from "./register";
import { Walker, WalkerEvents } from "./walker";

export interface ActionExecutorEvents<T extends Action> extends WalkerEvents<T> {
    executestart: ActionContext<T>;
    parsestart: ActionContext<T>;
    executefinish: ActionContext<T>;
    parsefinish: ActionContext<T>;
}

export abstract class ActionExecutor<T extends Action> extends Walker<ActionContext<T>> {
    private parserRegister: Register<ParserFunction> = new Register();
    private pluginRegister: Register<PluginFunction> = new Register();
    public parser: Parser;
    public register: { plugin: Register<PluginFunction>; parser: Register<ParserFunction> };
    private currentContext?: ActionContext<T>;

    constructor(options?: { page?: Page; actions?: T[] }) {
        super();
        /** 初始化任务，如果不存在任务，则必须使用 addActions 添加 */
        if (options) {
            const { page, actions } = options;
            if (page) {
                this.addActions(actions || [], { browser: page.browser(), page, frame: page.mainFrame() } as ActionContext<T>);
            }
        }
        let ctx = this.peek(0);
        if (ctx) this.currentContext = ctx;

        this.parser = new Parser(this.parserRegister);
        this.register = {
            plugin: this.pluginRegister,
            parser: this.parserRegister,
        };
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
            ctx.action = this.parser.parse(ctx.action);
            this.emit("parsefinish", ctx);
            this.currentContext = ctx;

            if (ctx.action && !Array.isArray(ctx.action)) {
                /** 执行插件 ， 并处理返回值 */
                const plugin = this.pluginRegister.get(ctx.action.use);
                if (plugin) {
                    let result = await plugin(ctx);
                    this.emit("executefinish", ctx);
                    if (result) {
                        if (Array.isArray(result)) {
                            ctx.action.actions = result;
                        } else {
                            ctx = result as ActionContext<T>;
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
    addActions(actions: any[], ctx?: Omit<ActionContext<T>, "action">) {
        let { page, browser, frame } = ctx || {};
        this.add(
            ...actions.map(
                (a) =>
                    ({
                        page,
                        browser,
                        frame,
                        action: a,
                    } as ActionContext<T>)
            )
        );
    }
}

export let defaultPwdPaths = [process.cwd(), __dirname, "./"];

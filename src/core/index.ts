import { PluginExecutor } from "./executor/PluginExecutor";
import { ActionContext, Action, ObjectAction, PluginFunction, ParserFunction } from "..";
import { Browser, Frame, Page } from "puppeteer-core";
import EventEmitter from "events";
import { ArrayParser } from "../parser/ArrayParser";
import { FrameParser } from "../parser/FrameParser";
import { PageParser } from "../parser/PageParser";

export interface JsonsepOptions {}

export class Jsonsep extends EventEmitter {
    private parsers: ParserFunction[] = [ArrayParser, FrameParser, PageParser];
    private plugins: Map<string, PluginFunction<Action>> = new Map();
    private pluginExecutor: PluginExecutor = new PluginExecutor();

    constructor(options?: JsonsepOptions) {
        super();
    }
    /** 清除所有插件 */
    clear() {
        this.plugins.clear();

        return this;
    }

    /** 注册插件 */
    use(name: string, plugin: PluginFunction<Action>) {
        this.plugins.set(name, plugin);

        return this;
    }

    /** 删除插件 */
    remove(name: string) {
        this.plugins.delete(name);

        return this;
    }

    /** 解析操作 */
    parse(action: Action): ObjectAction {
        for (const parser of this.parsers) {
            action = parser(action) || action;
        }
        return action as ObjectAction;
    }

    /** 解析操作列表 */
    parseAll(actions: Action[]) {
        return actions.map((action) => this.parse(action));
    }

    async execute(ctx: ActionContext<Action>) {
        ctx.action = this.parse(ctx.action);
        const plugin = this.plugins.get(ctx.action.use);
        if (plugin) {
            const newContext = await this.pluginExecutor.execute(plugin, ctx as ActionContext<ObjectAction>);
            // 如果返回的上下文中 操作带有子操作的，则执行子操作
            if (newContext && !Array.isArray(newContext.action) && newContext.action.actions) {
                await this.executeAll(newContext.action.actions, newContext);
            }
        }
    }

    /** 全部执行 */
    async executeAll(actions: Action[], options: ExecuteOptions) {
        for (let action of actions) {
            try {
                await this.execute({
                    browser: options.browser || options.page.browser(),
                    page: options.page,
                    frame: options.frame || options.page.mainFrame(),
                    action,
                });
            } catch (e) {
                console.error(["error", e]);
            }
        }
    }
}

export interface ExecuteOptions {
    browser?: Browser;
    page: Page;
    frame?: Frame;
}

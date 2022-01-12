import { ObjectExecutor } from "./executor/ObjectExecutor";
import { ActionContext, Action, ObjectAction, ActionParser } from "..";

import { ArrayParser } from "./parser/ArrayParser";

import { Parsers } from "./parser";
import { ParserFactory } from "./parser/ParserFactory";
import { Browser, Frame, Page } from "puppeteer-core";

export interface JsonsepOptions {
    parserNames?: (keyof Parsers)[];
}

export class Jsonsep {
    private parsers: ActionParser[];
    private parserFactory: ParserFactory = new ParserFactory();
    private objectExecutor: ObjectExecutor = new ObjectExecutor();

    constructor(options?: JsonsepOptions) {
        this.parsers = this.parserFactory.all(options?.parserNames || ["array", "page", "frame"]);
    }

    parse(action: Action): ObjectAction {
        for (const parser of this.parsers) {
            action = parser.parse(action) || action;
        }
        return action as ObjectAction;
    }

    parseAll(actions: Action[]) {
        return actions.map((action) => this.parse(action));
    }

    async execute(ctx: ActionContext<Action>) {
        ctx.action = this.parse(ctx.action);
        const newContext = await this.objectExecutor.execute(ctx as ActionContext<ObjectAction>);
        // 如果返回的上下文中 操作带有子操作的，则执行子操作
        if (newContext && !Array.isArray(newContext.action) && newContext.action.actions) {
            await this.executeAll(newContext.action.actions, newContext);
        }
    }

    /** 全部解析 */
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

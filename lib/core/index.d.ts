import { ActionContext, Action, ObjectAction } from "..";
import { Parsers } from "./parser";
import { Browser, Frame, Page } from "puppeteer-core";
export interface JsonsepOptions {
    parserNames?: (keyof Parsers)[];
}
export declare class Jsonsep {
    private parsers;
    private parserFactory;
    private objectExecutor;
    constructor(options?: JsonsepOptions);
    parse(action: Action): ObjectAction;
    parseAll(actions: Action[]): ObjectAction[];
    execute(ctx: ActionContext<Action>): Promise<void>;
    /** 全部解析 */
    executeAll(actions: Action[], options: ExecuteOptions): Promise<void>;
}
export interface ExecuteOptions {
    browser?: Browser;
    page: Page;
    frame?: Frame;
}

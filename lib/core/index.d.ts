import { Frame, Page } from "puppeteer-core";
import "reflect-metadata";
import { JSONPlugin } from "../plugins";
import { Action, ActionExecutor, ArrayAction, JSONExecutor, ObjectAction } from "./types";
/**
 * 数组解析器
 */
export declare class ArrayExecutor extends JSONExecutor {
    execute(action: ArrayAction): Promise<void>;
}
/**
 * 对象解析器
 * 加载内置插件，并对json进行解析运行
 */
export declare class ObjectExecutor extends JSONExecutor {
    page: Page;
    mainFrame: Frame;
    plugins: JSONPlugin[];
    arrayExecutor: ArrayExecutor;
    constructor(page: Page, mainFrame: Frame);
    execute(action: ObjectAction): Promise<ActionExecutor | undefined>;
}
/**
 * 默认的解析器
 */
export declare class DefaultExecutor extends JSONExecutor {
    page: Page;
    mainFrame: Frame;
    arrayExecutor: ArrayExecutor;
    objectExecutor: ObjectExecutor;
    constructor(page: Page, mainFrame: Frame);
    execute(action: Action): Promise<void>;
    executeAll(actionExecutor: ActionExecutor): Promise<void>;
}

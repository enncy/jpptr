import { Page } from "puppeteer-core";
import { Action } from "../core/types";
/**
 * 条件判断插件
 */
export declare class ConditionPlugin {
    invoke(page: Page, json: ConditionPluginJSON): Promise<Action[] | undefined>;
    /**
     * 处理 if 语句
     * @param page 页面
     * @param ifJSON 语句体
     */
    if(page: Page, ifJSON: ConditionJSON): Promise<Action[] | undefined>;
    /**
     * 处理条件
     * @param page page 页面
     * @param conditions 条件构造体
     * @param handler 处理器
     * @returns
     */
    handle(page: Page, conditions: ConditionWrapper, handler: (condition: string, str: string) => boolean | Promise<boolean>): Promise<boolean>;
}
export interface ConditionWrapper {
    url?: string;
    cookie?: string;
    text?: string;
    selector?: string;
}
export interface ConditionPluginJSON {
    if: ConditionJSON;
    "else if": ConditionJSON[];
    else: Action[];
}
export interface ConditionJSON {
    include?: ConditionWrapper;
    match?: ConditionWrapper;
    actions: Action[];
}

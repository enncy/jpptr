import { Browser, Frame, Page } from "puppeteer-core";
import { ConditionPluginParam } from "./condition";
import { FramePluginParam } from "./frame";
import { PagePluginParam } from "./page";
import { FunctionPluginParam } from "./function";

export interface ObjectAction {
    use: string;
    frame?: string | number;
    page?: number;
    actions?: Action[];
}

export type ArrayAction = [string, ...(string | number | boolean)[]];

export type Action = ArrayAction | ObjectAction | ConditionPluginParam | FramePluginParam | PagePluginParam | FunctionPluginParam;

export interface ActionContext<T extends Action> {
    browser?: Browser;
    page?: Page;
    frame?: Frame;
    action: T;
}

export type PluginReturnType<T extends Action> = void | undefined | T[] | ActionContext<T>;

export type PluginFunction = (ctx: ActionContext<any>) => PluginReturnType<Action> | Promise<PluginReturnType<Action>>;

export interface JpptrPluginError extends Error {}

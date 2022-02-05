export * from "./switch";
export * from "./frame";
export * from "./page";
export * from "./function";
export * from "./variables";
export * from "./for";
import { Action, Context } from "../core/types";

export type PluginReturnType<T extends Action> = void | undefined | T[] | Partial<Context<T>>;

export type PluginFunction = (ctx: Context<any>) => PluginReturnType<Action> | Promise<PluginReturnType<Action>>;

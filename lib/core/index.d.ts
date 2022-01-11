import "reflect-metadata";
import { Action, ArrayAction, ObjectAction, Plugin, PluginContext } from "../plugins";
import { Executor } from "./types";
/**
 * 数组解析器
 */
export declare class ArrayExecutor extends Executor {
    execute(ctx: PluginContext<ArrayAction>): Promise<void>;
}
/**
 * 对象解析器
 * 加载内置插件，并对json进行解析运行
 */
export declare class ObjectExecutor extends Executor {
    plugins: Plugin[];
    arrayExecutor: ArrayExecutor;
    constructor();
    execute(ctx: PluginContext<ObjectAction>): Promise<PluginContext<Action> | undefined>;
}
/**
 * 默认的解析器
 */
export declare class DefaultExecutor extends Executor {
    arrayExecutor: ArrayExecutor;
    objectExecutor: ObjectExecutor;
    constructor();
    execute(ctx: PluginContext<any>): Promise<void>;
    executeAll(actions: Action[], ctx: Omit<PluginContext<any>, "action">): Promise<void>;
}

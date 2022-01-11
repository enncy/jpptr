import "reflect-metadata";
import { JSONPlugin, PluginContext } from "../plugins";
import { JSONExecutor } from "./types";
/**
 * 数组解析器
 */
export declare class ArrayExecutor extends JSONExecutor {
    execute(ctx: PluginContext<any>): Promise<void>;
}
/**
 * 对象解析器
 * 加载内置插件，并对json进行解析运行
 */
export declare class ObjectExecutor extends JSONExecutor {
    plugins: JSONPlugin[];
    arrayExecutor: ArrayExecutor;
    constructor();
    execute(ctx: PluginContext<any>): Promise<PluginContext<any> | undefined>;
}
/**
 * 默认的解析器
 */
export declare class DefaultExecutor extends JSONExecutor {
    arrayExecutor: ArrayExecutor;
    objectExecutor: ObjectExecutor;
    constructor();
    execute(ctx: PluginContext<any>): Promise<void>;
    executeAll(ctx: PluginContext<any>): Promise<void>;
}

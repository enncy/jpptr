import { Action, Plugin, ActionContext } from "../..";
import { Executor } from "../types";
import { ObjectAction, PluginReturnType } from "../../plugins";
/**
 * 对象解析器
 * 加载内置插件，并对json进行解析运行
 */
export declare class ObjectExecutor implements Executor {
    plugins: Plugin<Action>[];
    constructor();
    execute(ctx: ActionContext<ObjectAction>): Promise<ActionContext<ObjectAction> | undefined>;
    /**
     * 解析插件返回值，转换成可执行的上下文
     * @param ctx 原上下文
     * @param result 插件返回值
     */
    resolveReturnValue(ctx: ActionContext<ObjectAction>, result: PluginReturnType<Action>): ActionContext<ObjectAction>;
}

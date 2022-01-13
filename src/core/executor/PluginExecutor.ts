import { Action, ActionContext } from "../..";
import { ObjectAction, PluginFunction, PluginReturnType } from "../../plugins";
/**
 * 插件执行器
 * 加载内置插件，并对json进行解析运行
 */
export class PluginExecutor {
    constructor() {}

    async execute(plugin: PluginFunction<Action>, ctx: ActionContext<ObjectAction>) {
        // 运行插件
        const result = await plugin(ctx);
        return this.resolveReturnValue(ctx, result);
    }

    /**
     * 解析插件返回值，转换成可执行的上下文
     * @param ctx 原上下文
     * @param result 插件返回值
     */
    resolveReturnValue(ctx: ActionContext<ObjectAction>, result: PluginReturnType<Action>) {
        if (result) {
            // 如果返回新的执行列表，则执行
            if (Array.isArray(result)) {
                ctx.action.actions = result;
            }
            // 如果返回新的上下文，则直接使用此上下文
            else {
                ctx = result as ActionContext<ObjectAction>;
            }
        }
        return ctx;
    }
}

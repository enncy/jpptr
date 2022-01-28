import { Context, ObjectAction } from "../../core/types";

/**
 * 提供对变量变量操作的插件
 */
export function VariablesApplyPlugin({
    variables,
    action,
    var: varName,
}: Pick<Context<any>, "variables"> & { action: ApplyPluginParam; var: string }) {
    /** 对基础类型进行包装转换 */
    if (typeof variables[varName] !== "object") {
        variables[varName] = new Object(variables[varName]);
    }

    if (varName && action.name) {
        /** 获取方法 */
        const func = Reflect.get(variables[varName], action.name);
        /** 执行 */
        const res = Reflect.apply(func, variables[varName], action.args || []);
        if (action.reassign) {
            variables[varName] = res;
        }
    }

    return { variables };
}

/** 变量操作插件参数 */
export type ApplyPluginParam = {
    /** 是否对变量重新分配值，值为当前执行函数的返回值 */
    reassign?: boolean;
    /** 方法参数 */
    args?: any[];
} & (
    | {
          /** 对变量操作的方法名, 例如 字符串的 toString, 数组的 push, pop */
          name: keyof String | keyof Array<any> | keyof Object | keyof Boolean;
      }
    | { name: string }
);

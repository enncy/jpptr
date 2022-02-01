import { Context } from "../../core/types";
import { VariablesPluginParams } from "../variables";

/**
 * a plugin that provides support for variable operation.
 *
 * use {@link VariablesPluginParams.apply} to call this function
 */
export function VariablesApplyPlugin({
    variables,
    action,
    var: varName,
}: Pick<Context<any>, "variables"> & { action: ApplyPluginParams; var: string }) {
    variables = variables || {};
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

/**
 * param of {@link VariablesApplyPlugin}
 */
export type ApplyPluginParams = {
    /**
     * reassign a value to this variable, the value is the return value of the currently executed function
     */
    reassign?: boolean;
    /** arguments of function */
    args?: any[];
} & (
    | {
          /**
           * function name of `String | Array | Object | Boolean`
           *
           * @example toString, push, pop
           *
           */
          name: keyof String | keyof Array<any> | keyof Object | keyof Boolean;
      }
    | { name: string }
);

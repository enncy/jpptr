import { Action, ObjectAction, ActionContext } from ".";
declare const _default: {
    name: string;
    run({ page, frame, action }: ActionContext<ConditionPluginParam>): Promise<Action[]>;
};
/**
 * 条件判断插件
 */
export default _default;
interface ConditionWrapper {
    url?: string;
    cookie?: string;
    text?: string;
    selector?: string;
}
export interface ConditionPluginParam extends ObjectAction {
    use: "condition";
    if: ConditionParam;
    elif: ConditionParam[];
    else: Action[];
}
interface ConditionParam {
    include?: ConditionWrapper;
    match?: ConditionWrapper;
    actions?: Action[];
}

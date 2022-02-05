import { Register } from "../core";
import { ParserFunction, ParserContext } from "./types";

export interface ActionParser {
    parser: ParserFunction;
    priority?: number;
}

export class Parser {
    constructor(private parserRegister: Register<string, ActionParser | ParserFunction>) {}

    parse(actionContext: ParserContext<any>) {
        /** 将没有优先级的解析器方法，转换成默认优先级为 10 的解析器对象 */
        let aps = this.parserRegister.values().map((ap) =>
            typeof ap === "function"
                ? ({
                      priority: 10,
                      parser: ap,
                  } as ActionParser)
                : ap
        );

        /** 对解析器 降序 排序 */
        aps = aps.sort((a, b) => (b.priority || 10) - (a.priority || 10));

        for (const ap of aps) {
            /** 解析动作 */
            actionContext.action = ap.parser(actionContext) || actionContext.action;
        }
        return actionContext.action;
    }
}

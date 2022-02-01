import { PluginParamsWithName } from "../core/schema";
import { Action, ObjectAction } from "../core/types";
import { ParserContext } from "./types";

/**
 * syntactic sugar parser of {@link ObjectAction.page}
 * 
 * 
 * @param options {@link ObjectAction}
 * @example
 * ```json
 * {
 *      "use":"function",
 *      "name":"goto",
 *      "args":["https://example.com"],
 *      "page":-1,
 *      "actions":[["click","#btn"]]
 * }
 * // will be parsed to
 * {
 *      "use":"page",
 *      "index":-1,
 *      "actions":[
 *          {
 *              "use":"function",
                "name":"goto",
                "args":["https://example.com"],
 *          },
            ["click","#btn"]
 *      ]
 * }
 * ```
 */
export function PageParser({ action }: ParserContext<any>): PluginParamsWithName["page"] | undefined {
    if (!Array.isArray(action) && action.page) {
        const { actions = [], page, ...newAction } = action;

        return {
            use: "page",
            index: action.page,
            actions: [newAction as Action].concat(actions),
        };
    }
}

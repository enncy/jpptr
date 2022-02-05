import { PluginParamsWithName } from "../core/schema";
import { Action, ObjectAction } from "../core/types";
import { ParserContext } from "./types";

/**
 * syntactic sugar parser of {@link ObjectAction.frame}
 *
 *
 * @param options {@link ObjectAction}
 * @category Parser
 * @example
 * ```json
 * {
 *      "use": "function",
 *      "name": "goto",
 *      "args": ["https://example.com"],
 *
 *      "frame": "test_frame",
 *      "frame": -1,
 *
 *      "actions": [["click", "#btn"]]
 *
 *  }
 * // will be parsed to
 * {
 *      "use": "frame",
 *      "name": "test_frame",
 *      "index": -1,
 *
 *      "actions": [
 *          {
 *          "use": "function",
 *          "name": "goto",
 *          "args": ["https://example.com"]
 *          },
 *          ["click","#btn"]
 *      ]
 *  }
 * ```
 */

export function FrameParser({ action }: ParserContext<any>): PluginParamsWithName["frame"] | undefined {
    if (!Array.isArray(action) && action.frame) {
        const { actions = [], frame, ...newAction } = action;
        if (typeof action.frame === "string") {
            return {
                use: "frame",
                name: action.frame,
                actions: [newAction as Action].concat(actions),
            };
        } else if (typeof action.frame === "number") {
            return {
                use: "frame",
                index: action.frame,
                actions: [newAction as Action].concat(actions),
            };
        }

        return action;
    }
}

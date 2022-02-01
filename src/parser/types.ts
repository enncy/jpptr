import { Action, Context, ObjectAction } from "../core/types";

/**
 * function type of parser
 *
 * The parser can be used to parse an action.
 *
 * you can also use plugin to do that, but this is not necessary if the action dose not involve the content of the page.
 *
 * @example
 * ```js
 * function myParser({action}){
 *      if(typeof action === 'number'){
 *          return {
 *              "use":"number-plugin"
 *          }
 *      }
 * }
 *
 * jpptr.options.register.parser.use("my-parser",myParser)
 * ```
 *
 * and use in actions file
 * ```json
 * {
 *      "actions":[
 *          1
 *      ]
 * }
 * ```
 * will be parsed to
 * ```json
 * {
 *      "actions":[
 *          {
 *              "use":"number-plugin"
 *          }
 *      ]
 * }
 * ```
 */
export type ParserFunction = (actionContext: ParserContext<any>) => ObjectAction | undefined;

/** context of parser */
export type ParserContext<T extends Action> = Pick<Context<T>, "variables" | "action">;

import { ArrayAction } from "../..";
import { FunctionPluginParam } from "../../plugins/function";
import { ActionParser } from "../types";
/**
 * 数组解析器
 */
export declare class ArrayParser implements ActionParser {
    parse(action: ArrayAction): FunctionPluginParam | undefined;
}

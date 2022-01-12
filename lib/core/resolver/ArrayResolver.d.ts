import { PluginContextResolver } from "../types";
import { PluginContext } from "../..";
import { ArrayParser } from "../parser/ArrayParser";
export declare class ArrayResolver implements PluginContextResolver {
    arrayParser: ArrayParser;
    constructor();
    resolve(ctx: PluginContext<any>): PluginContext<any>;
}

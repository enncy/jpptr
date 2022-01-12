import { ArrayResolver } from "./ArrayResolver";
import { PluginContextSwitchableResolver } from "./PluginContextSwitchableResolver";
export interface Resolvers {
    array: ArrayResolver;
    switchable: PluginContextSwitchableResolver;
}
export declare const resolvers: (typeof ArrayResolver | typeof PluginContextSwitchableResolver)[];

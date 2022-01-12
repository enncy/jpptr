import { PluginContext, PluginContextResolver, ObjectAction } from "../..";
export declare class PluginContextSwitchableResolver implements PluginContextResolver {
    resolve(ctx: PluginContext<ObjectAction>): Promise<PluginContext<any>>;
}

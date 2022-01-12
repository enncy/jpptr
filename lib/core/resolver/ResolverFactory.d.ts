import { Resolvers } from ".";
import { PluginContextResolver } from "../types";
export declare class ResolverFactory {
    create<T extends PluginContextResolver>(targetName: keyof Resolvers): T | undefined;
    all<T extends PluginContextResolver>(targetName: (keyof Resolvers)[]): T[];
}

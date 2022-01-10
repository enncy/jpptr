import { PluginContext } from ".";
/**
 * 外部脚本加载插件
 */
export declare class ExternalPlugin {
    invoke({ page, frame, json }: PluginContext): Promise<void>;
}
export interface ExternalPluginJSON {
    url?: string;
    path?: string;
    content?: string;
    frame?: string;
}

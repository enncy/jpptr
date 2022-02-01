import { ArrayParser } from "../parser";
import { ParserFunction } from "../parser/types";
import { PluginFunction } from "../plugins";
import { ForPluginParams } from "../plugins/for";
import { FramePluginParams } from "../plugins/frame";
import { FunctionPluginParams } from "../plugins/function";
import { PagePluginParams } from "../plugins/page";
import { SwitchPluginParams } from "../plugins/switch";
import { VariablesPluginParams } from "../plugins/variables";
import { ArrayAction, JpptrOptions } from "./types";

/**
 * json schema of actions file
 */
export interface JpptrSchema {
    /**
     * extends file.
     *
     * you can use this option to merge other action file
     *
     * which has same options of {@link JpptrSchema}
     *
     * @example
     *
     * {
     *      "extends":"./base.config.json"
     * }
     */
    extends?: string;
    /** json schema of module register */
    register?: ModuleRegisterSchema;
    /** json schema of actions */
    actions?: ActionSchema[];

    variables?: JpptrOptions["variables"];
    launch?: JpptrOptions["launch"];
}

/**
 * module register
 */
export interface ModuleRegisterSchema {
    /** register of plugin */
    plugins?: {
        /** name of plugin */
        name: string;
        /**
         * - js module path of plugin
         * - function of plugin
         */
        plugin: string | PluginFunction;
    }[];
    /** register of parser */
    parsers?: {
        /** name of parser */
        name: string;
        /**
         * - js module path of parser
         * - function of parser
         */
        parser: string | ParserFunction;
        /**
         * priority of parser.
         *
         * the priority of {@link ArrayParser} is 100
         *
         * @default 10
         */
        priority: number;
    }[];
}

export interface PluginParams {
    page: PagePluginParams;
    frame: FramePluginParams;
    switch: SwitchPluginParams;
    function: FunctionPluginParams;
    variables: VariablesPluginParams;
    for: ForPluginParams;
}

export interface PluginParamsWithName {
    page: PagePluginParams & { use: "page" };
    frame: FramePluginParams & { use: "frame" };
    switch: SwitchPluginParams & { use: "switch" };
    function: FunctionPluginParams & { use: "function" };
    variables: VariablesPluginParams & { use: "variables" };
    for: ForPluginParams & { use: "for" };
}

export type ActionSchema =
    | ArrayAction
    | PluginParamsWithName[keyof PluginParamsWithName]
    | { use: string }
    | { use: keyof PluginParams };

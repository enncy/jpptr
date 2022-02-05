import { pino } from "pino";
import { VariablesParser, defaultPlaceholder } from "../parser/VariablesParser";
import { ArrayParser, FrameParser, PageParser } from "../parser";

import {
    LaunchOptions,
    BrowserLaunchArgumentOptions,
    BrowserConnectOptions,
    Product,
    Page,
    Frame,
    Browser,
} from "puppeteer-core";
import "reflect-metadata";
import { ModuleRegister } from "./register";
import { PluginParams } from "./schema";
import { DebugOptions } from "./debugger";

/** 
 * options of puppeteer
 * 
 * @see https://pptr.dev/#?product=Puppeteer&version=v13.0.1&show=api-puppeteerlaunchoptions
 */
export type PuppeteerOptions = LaunchOptions &
    BrowserLaunchArgumentOptions &
    BrowserConnectOptions & {
        product?: Product;
        extraPrefsFirefox?: Record<string, unknown>;
    };

/** jpptr options */
export interface JpptrOptions {
    /**
     *
     * if `true` use [ora](https://www.npmjs.com/package/ora) to output in console.
     *
     * set `debug.formatter` to change style of console.
     *
     * ****
     * and you can use `debug.dest` to customize the path of debug file
     *
     * @see {@link DebugOptions}
     */
    debug?: boolean | DebugOptions;
    /**
     * variables pool.
     *
     * you can set any variable in this.
     *
     * we will use {@link VariablesParser} to parse.
     *
     * and you can use placeholder : {@link defaultPlaceholder} to use you variables
     *
     * @example
     * ```js
     * "variables":{
     *      "username":"Jimmy",
     *      "password":"123456",
     * }
     * ```
     */
    variables?: Variables;
    /** module register */
    register?: ModuleRegister;
    /** launch options of puppeteer */
    launch?: PuppeteerOptions;
    /** list of actions */
    actions?: Action[];
}

/**
 * array-like action.
 *
 * use {@link ArrayParser} to parse
 *
 * @example
 * ```json
 * ["goto","https://example.com"]
 * ```
 *
 */
export type ArrayAction = [keyof Page | keyof Frame | keyof Browser, ...any[]];

/**
 * basic action
 * @example
 * ```json
 * {
 *      "use":"xxx",
 *      // ...options
 * }
 * ```
 */
export type ObjectAction = {
    /**
     * use the index to specify the frame.
     * 
     * parser: {@link FrameParser}
     * 
     * @example
     * ```js
     * {
          frame: 0  // the first frame  
          frame: -1  // the last frame 
          frame: test_name // this name of frame
     * }
     * ```
     */
    frame?: string | number;

    /**
     * use the index to specify the page.
     *
     * parser: {@link PageParser}
     *
     * @example
     * 0 : the first frame
     * -1: the last frame
     * @see Array.at
     */
    page?: number;

    /** child actions */
    actions?: Action[];
    /** description of actions */
    description?: string;
} & (
    | {
          /** use plugin */
          use: keyof PluginParams;
      }
    | {
          /** customize the name of use */
          use: string;
      }
);

/**
 * type of action
 */
export type Action = ArrayAction | PluginParams[keyof PluginParams] | ObjectAction;

/** context of parser and plugin */
export type Context<T extends Action> = {
    /** puppeteer Browser */
    browser?: Browser;
    /** puppeteer Page */
    page?: Page;
    /** puppeteer Frame */
    frame?: Frame;
    /** variables pool */
    variables?: Variables;
    /**
     * the action of json file with actions,
     * could be {@link ArrayAction} or {@link ObjectAction}, also could be customize action
     */
    action: T;
};

/** type of variables pool */
export type Variables = Record<string, any>;

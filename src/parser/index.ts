
import { Register } from "../core/register";
import { ObjectAction } from "../plugins";
import { ArrayParser } from "./ArrayParser";
import { ExternalParser } from "./ExternalParser";
import { FrameParser } from "./FrameParser";
import { PageParser } from "./PageParser";

export interface ActionParser {
    parse: ParserFunction;
}

export type ParserFunction = (action: any) => ObjectAction | undefined;

export class Parser {
    constructor(private parserRegister: Register<ParserFunction>) {}
    parse(config: any) {
        if (config) {
            for (const p of this.parserRegister.values()) {
                config = p(config) || config;
            }
        }
        return config;
    }
}

export { ArrayParser, ExternalParser, FrameParser, PageParser };

/**
 * 默认json解析注册器
 */
export function defaultParsers() {
    return new Register<ParserFunction>()
        .use(ParserNames["array-parser"], ArrayParser)
        .use(ParserNames["frame-parser"], FrameParser)
        .use(ParserNames["page-parser"], PageParser)
        .use(ParserNames["external-parser"], ExternalParser);
}

/**
 * 默认解析器名
 */
 export enum ParserNames {
    /** 数组解析器 */
    "array-parser" = "array",
    /** 外部模块解析器 */
    "external-parser" = "external",
    /** 页面框架切换解析器 */
    "frame-parser" = "frame",
    /** 页面切换解析器 */
    "page-parser" = "page",
}

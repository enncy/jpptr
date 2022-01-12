import { PageParser } from "./PageParser";
import { ArrayParser } from "./ArrayParser";
import { FrameParser } from "./FrameParser";
export interface Parsers {
    array: ArrayParser;
    page: PageParser;
    frame: FrameParser;
}
export declare const parsers: (typeof ArrayParser | typeof FrameParser)[];

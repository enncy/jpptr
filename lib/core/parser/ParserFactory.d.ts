import { Parsers } from ".";
import { ActionParser } from "../types";
export declare class ParserFactory {
    create<T extends ActionParser>(targetName: keyof Parsers): T | undefined;
    all<T extends ActionParser>(targetName: (keyof Parsers)[]): T[];
}

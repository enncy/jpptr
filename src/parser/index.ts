import { Register } from "../core/register";
import { Action, ObjectAction } from "../plugins";

export interface ActionParser {
    parse: ParserFunction;
}

export type ParserFunction = (action: any) => ObjectAction | undefined;

export class Parser {
    constructor(private parserRegister: Register<ParserFunction>) {}
    parse(json: any) {
        if (json) {
            for (const p of this.parserRegister.values()) {
                json = p(json) || json;
            }
        }
        return json;
    }
}

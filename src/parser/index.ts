import { Action, ObjectAction } from "../plugins";

 
export interface ActionParser {
    parse(action: Action): ObjectAction | undefined;
}

export type ParserFunction = (action: Action) => ObjectAction | undefined;



export class Parser {
    constructor(private parsers: ParserFunction[]) {}
    parse(json: any) {
        for (const p of this.parsers) {
            json = p(json) || json;
        }
        return json;
    }
}
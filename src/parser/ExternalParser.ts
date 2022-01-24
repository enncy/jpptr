import { ParserNames } from ".";

 

export function ExternalParser(action: any) {
    if (!Array.isArray(action) && action.use === ParserNames["external-parser"] && action.name) {
        let { name, use, ...actionOptions } = action;
        action = {
            use: action.name,
            ...actionOptions,
        };
        return action;
    }
}

import { parsers, Parsers } from ".";
import { ActionParser } from "../types";

export class ParserFactory {
    create<T extends ActionParser>(targetName: keyof Parsers): T | undefined {
        for (const target of parsers) {
            if (Reflect.getMetadata("parser:name", target) === targetName) {
                return new target() as T;
            }
        }
    }

    all<T extends ActionParser>(targetName: (keyof Parsers)[]): T[] {
        return targetName.map((name) => this.create(name)).filter((r) => r !== undefined) as T[];
    }
}

import { ParserFunction, defaultParsers, ActionParser } from "../parser";
import { PluginFunction, defaultPlugins } from "../plugins";

export class ModuleRegister {
    plugin: Register<PluginFunction> = new Register();
    parser: Register<ActionParser> = new Register();

    constructor() {
        this.parser.useAll(defaultParsers().entries());
        this.plugin.useAll(defaultPlugins().entries());
    }
}

export class Register<T> {
    private items: Map<string, T> = new Map();

    use(name: string, item: T) {
        this.items.set(name, item);
        return this;
    }

    useAll(items: IterableIterator<[string, T]> | [string, T][]) {
        for (const item of items) {
            this.items.set(item[0], item[1]);
        }
    }

    remove(name: string) {
        this.items.delete(name);
        return this;
    }

    clear() {
        this.items.clear();
        return this;
    }

    get(name: string) {
        return this.items.get(name);
    }

    keys() {
        return Array.from(this.items.keys());
    }

    values() {
        return Array.from(this.items.values());
    }

    entries() {
        return Array.from(this.items.entries());
    }

    toString() {
        return this.entries();
    }
}

import { defaultParsers, ActionParser } from "../parser";
import { PluginFunction, defaultPlugins } from "../plugins";
import { PluginParams } from "./schema";

export class ModuleRegister {
    plugin: Register<string | keyof PluginParams, PluginFunction> = new Register();
    parser: Register<string, ActionParser> = new Register();

    constructor() {
        this.parser.useAll(defaultParsers().entries());
        this.plugin.useAll(defaultPlugins().entries());
    }
}

export class Register<T, M> {
    private items: Map<T, M> = new Map();

    use(name: T, item: M) {
        this.items.set(name, item);
        return this;
    }

    useAll(items: IterableIterator<[T, M]> | [T, M][]) {
        for (const item of items) {
            this.items.set(item[0], item[1]);
        }
    }

    remove(name: T) {
        this.items.delete(name);
        return this;
    }

    clear() {
        this.items.clear();
        return this;
    }

    get(name: T) {
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

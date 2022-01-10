import { Page } from "puppeteer-core";
import "reflect-metadata";
import Plugins, { JSONPlugin } from "../plugins";
import { Action, ArrayAction, JSONExecutor, ObjectAction } from "./types";

/**
 * 数组解析器
 */
export class ArrayExecutor extends JSONExecutor {
    async execute(action: ArrayAction) {
        console.log(action);

        let key = action.shift();
        if (key) {
            const fun = Reflect.get(this.page, key);
            if (typeof fun === "function") {
                await Reflect.apply(fun, this.page, action);
            }
        }
    }
}

/**
 * 对象解析器
 * 加载内置插件，并对json进行解析运行
 */
export class ObjectExecutor extends JSONExecutor {
    plugins: JSONPlugin[];
    arrayExecutor: ArrayExecutor;

    constructor(public page: Page) {
        super(page);
        this.arrayExecutor = new ArrayExecutor(page);
        this.plugins = Plugins.map((plugin) => new plugin());
    }

    async execute(action: ObjectAction) {
        if (action.use) {
            for (const plugin of this.plugins) {
                let name = Reflect.getMetadata("plugin:name", plugin.constructor);
                if (name === action.use) {
                    const invokeAction = await plugin.invoke(this.page, action);
                    if (invokeAction && Array.isArray(invokeAction)) {
                        return invokeAction;
                    }
                }
            }
        }
    }
}

/**
 * 默认的解析器
 */
export class DefaultExecutor extends JSONExecutor {
    arrayExecutor: ArrayExecutor;
    objectExecutor: ObjectExecutor;

    constructor(public page: Page) {
        super(page);
        this.arrayExecutor = new ArrayExecutor(page);
        this.objectExecutor = new ObjectExecutor(page);
    }

    async execute(action: Action) {
        if (typeof action !== "object") {
        } else {
            if (Array.isArray(action)) {
                await this.arrayExecutor.execute(action);
            } else {
                const actions = await this.objectExecutor.execute(action);
                if (actions) {
                    await this.executeAll(actions);
                }
            }
        }
    }

    async executeAll(actions: Action[]) {
        for (const action of actions) {
            try {
                await this.execute(action);
            } catch (e) {
                console.error(["error", e]);
            }
        }
    }
}

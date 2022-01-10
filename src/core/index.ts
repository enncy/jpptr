import { Frame, Page } from "puppeteer-core";
import "reflect-metadata";
import Plugins, { JSONPlugin } from "../plugins";
import { Action, ActionExecutor, ArrayAction, JSONExecutor, ObjectAction } from "./types";

/**
 * 数组解析器
 */
export class ArrayExecutor extends JSONExecutor {
    async execute(action: ArrayAction) {
        let key = action.shift();
        if (key) {
            const fun = Reflect.get(this.mainFrame, key);
            if (fun) {
                if (typeof fun === "function") {
                    await Reflect.apply(fun, this.mainFrame, action);
                }
            } else {
                const pageFun = Reflect.get(this.page, key);
                if (pageFun) {
                    if (typeof pageFun === "function") {
                        await Reflect.apply(pageFun, this.page, action);
                    }
                } else {
                    // warning...
                }
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

    constructor(public page: Page, public mainFrame: Frame) {
        super(page, mainFrame);
        this.arrayExecutor = new ArrayExecutor(page, mainFrame);
        this.plugins = Plugins;
    }

    async execute(action: ObjectAction) {
        if (action.use) {
            // 执行插件方法
            for (const plugin of this.plugins) {
                if (plugin.name === action.use) {
                    // 运行插件
                    const invokeAction = await plugin.run({
                        browser:this.page.browser(),
                        page: this.page,
                        frame: this.mainFrame,
                        json: action,
                    });
                    // 如果存在返回值，则处理
                    if (invokeAction) {
                        if (Array.isArray(invokeAction)) {
                            return {
                                actions: invokeAction,
                                frame: this.page.mainFrame(),
                            } as ActionExecutor;
                        } else if (invokeAction.frame) {
                            return invokeAction;
                        }
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

    constructor(public page: Page, public mainFrame: Frame) {
        super(page, mainFrame);
        this.mainFrame = page.mainFrame();
        this.arrayExecutor = new ArrayExecutor(this.page, this.mainFrame);
        this.objectExecutor = new ObjectExecutor(this.page, this.mainFrame);
    }

    async execute(action: Action) {
        if (typeof action !== "object") {
            // warning...
        } else {
            if (Array.isArray(action)) {
                await this.arrayExecutor.execute(action);
            } else {
                const actionExecutor = await this.objectExecutor.execute(action);
                if (actionExecutor) {
                    await this.executeAll(actionExecutor);
                }
            }
        }
    }

    async executeAll(actionExecutor: ActionExecutor) {
        for (const action of actionExecutor.actions) {
            try {
                let frame = this.mainFrame;
                this.arrayExecutor.mainFrame = actionExecutor.frame;
                this.objectExecutor.mainFrame = actionExecutor.frame;
                await this.execute(action);
                this.arrayExecutor.mainFrame = frame;
                this.objectExecutor.mainFrame = frame;
            } catch (e) {
                console.error(["error", e]);
            }
        }
    }
}

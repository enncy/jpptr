import "reflect-metadata";
import Plugins, { Plugin, PluginContext } from "../plugins";
import { Executor } from "./types";

/**
 * 数组解析器
 */
export class ArrayExecutor extends Executor {
    async execute(ctx: PluginContext<any>) {
        console.log(ctx.action);

        if (ctx.action.length) {
            let key = ctx.action.shift();
            if (key) {
                const fun = Reflect.get(ctx.frame, key);
                if (fun) {
                    if (typeof fun === "function") {
                        await Reflect.apply(fun, ctx.frame, ctx.action);
                    }
                } else {
                    const pageFun = Reflect.get(ctx.page, key);
                    if (pageFun) {
                        if (typeof pageFun === "function") {
                            await Reflect.apply(pageFun, ctx.page, ctx.action);
                        }
                    } else {
                        // warning...
                    }
                }
            }
        } else {
            // warning...
        }
    }
}

/**
 * 对象解析器
 * 加载内置插件，并对json进行解析运行
 */
export class ObjectExecutor extends Executor {
    plugins: Plugin[];
    arrayExecutor: ArrayExecutor;

    constructor() {
        super();
        this.arrayExecutor = new ArrayExecutor();
        this.plugins = Plugins;
    }

    async execute(ctx: PluginContext<any>) {
        if (ctx.action.use) {
            // 执行插件方法
            for (const plugin of this.plugins) {
                if (plugin.name === ctx.action.use) {
                    // 运行插件
                    const invokeAction = await plugin.run(ctx);
                    // 如果存在返回值，则处理
                    if (invokeAction) {
                        // 如果返回新的执行列表，则执行
                        if (Array.isArray(invokeAction)) {
                            ctx.action = invokeAction;
                            return ctx;
                        }
                        // 如果返回新的上下文，则直接使用此上下文
                        else if (invokeAction.frame) {
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
export class DefaultExecutor extends Executor {
    arrayExecutor: ArrayExecutor;
    objectExecutor: ObjectExecutor;

    constructor() {
        super();

        this.arrayExecutor = new ArrayExecutor();
        this.objectExecutor = new ObjectExecutor();
    }

    async execute(ctx: PluginContext<any>) {
        if (typeof ctx.action !== "object") {
            // warning...
        } else {
            if (Array.isArray(ctx.action)) {
                await this.arrayExecutor.execute(ctx);
            } else {
                const actionExecutor = await this.objectExecutor.execute(ctx);
                if (actionExecutor) {
                    await this.executeAll(actionExecutor);
                }
            }
        }
    }

    async executeAll(ctx: PluginContext<any>) {
        for (const action of ctx.action) {
            try {
                await this.execute({
                    ...ctx,
                    action,
                });
            } catch (e) {
                console.error(["error", e]);
            }
        }
    }
}

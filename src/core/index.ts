
import "reflect-metadata";
import Plugins, { Action, ArrayAction, ObjectAction, Plugin, PluginContext, switchPluginContext } from "../plugins";
import { Executor } from "./types";
import { executePageFunction } from "./utils";



/**
 * 数组解析器
 */
export class ArrayExecutor extends Executor {
    async execute(ctx: PluginContext<ArrayAction>) {
        let [name, ...args] = ctx.action;
        if (name) {
            executePageFunction(ctx.page, ctx.frame, name, args);
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

    async execute(ctx: PluginContext<ObjectAction>) {
        if (ctx.action.use) {
            // 执行插件方法
            for (const plugin of this.plugins) {
                if (plugin.name === ctx.action.use) {
                    // 运行插件
                    const result = await plugin.run(ctx);
                    // 如果存在返回值，则处理
                    if (result) {
                        // 如果返回新的执行列表，则执行
                        if (Array.isArray(result)) {
                            ctx.action.actions = result;
                            return ctx;
                        }
                        // 如果返回新的上下文，则直接使用此上下文
                        else {
                            return result;
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
        if (typeof ctx.action !== "object" && Array.isArray(ctx.action)) {
            // warning...
        } else {
            if (Array.isArray(ctx.action)) {
                await this.arrayExecutor.execute(ctx);
            } else {
                const newCtx = await this.objectExecutor.execute(await switchPluginContext(ctx));
                // 如果返回的上下文中 操作带有子操作的，则执行子操作
                if (newCtx && !Array.isArray(newCtx.action) && newCtx.action.actions) {
                    await this.executeAll(newCtx.action.actions, newCtx);
                }
            }
        }
    }

    async executeAll(actions: Action[], ctx: Omit<PluginContext<any>, "action">) {
        for (const action of actions) {
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

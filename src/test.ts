import { timeStamp } from "console";
import Denque from "denque";
import EventEmitter from "events";
import path from "path";
import { Browser, launch, Page } from "puppeteer-core";
// import EventEmitter from "events";

import { Action, ActionContext, ParserFunction, PluginFunction } from ".";
import { ArrayParser } from "./parser/ArrayParser";
import { FrameParser } from "./parser/FrameParser";
import { PageParser } from "./parser/PageParser";
import { ConditionPlugin } from "./plugins/condition";
import { FramePlugin } from "./plugins/frame";
import { FunctionPlugin } from "./plugins/function";
import { ModulePlugin } from "./plugins/module";
import { PagePlugin } from "./plugins/page";

class Walker<T> extends EventEmitter {
    /** walk step index */
    private index: number = 0;
    /** values */
    private list: T[];
    private _isStop: boolean = false;

    constructor(array?: T[]) {
        super();
        this.list = array || [];
    }

    /** walk , and return the item value  */
    walk() {
        if (this._isStop) {
            return new Promise<T>((resolve, reject) => {
                this.once("start", () => {
                    this.emit("walk");
                    resolve(this.list[this.index++]);
                });
            });
        } else {
            this.emit("walk");
            return this.list[this.index++];
        }
    }

    /** walk the previous step */
    back() {
        if (!this._isStop) {
            this.emit("back", this.index);
            this.index = this.index - 1;
        }
    }

    /** jump to some step */
    jump(index: number) {
        if (!this._isStop) {
            this.emit("jump", index);
            this.index = index;
        }
    }

    reWalk() {
        if (!this._isStop) {
            this.emit("reWalk", this.index);
            this.index = 0;
        }
    }

    /** make stop false */
    start() {
        this._isStop = false;
        this.emit("start");
    }

    /** stop walking */
    stop() {
        this._isStop = true;
        this.emit("stop");
    }

    /** is walk stop */
    isStop() {
        return this.isStop;
    }

    /** is walk end */
    end() {
        return this.index === this.list.length;
    }

    peek(index?: number) {
        this.emit("peek");
        return this.list[index || this.index];
    }

    /** add actions at next */
    add(...actions: T[]) {
        this.emit("add", actions);
        this.list.splice(this.index, 0, ...actions);
    }

    /** add actions at some step */
    addAt(index: number, ...actions: T[]) {
        this.emit("add", actions);
        this.list.splice(index, 0, ...actions);
    }

    /** remove current action and return */
    remove(count?: number) {
        this.emit("remove", this.index, count || 1);
        return this.list.splice(this.index, count || 1);
    }

    /** remove action at some step and return */
    removeAt(index: number, count?: number) {
        this.emit("remove", index, count);
        return this.list.splice(index, count);
    }
}

class Parser {
    constructor(private parsers: ParserFunction[]) {}
    parse(json: any) {
        for (const p of this.parsers) {
            json = p(json) || json;
        }
        return json;
    }
}

abstract class ActionExecutor extends Walker<ActionContext<Action>> {
    protected parser: Parser;
    protected plugins: Map<string, PluginFunction>;

    constructor({ page, actions }: { page: Page; actions?: Action[] }) {
        super();
        this.addActions(actions || [], { browser: page.browser(), page, frame: page.mainFrame() });
        this.plugins = this.registerPlugin();
        this.parser = new Parser(this.registerParser());
    }

    abstract registerParser(): ParserFunction[];
    abstract registerPlugin(): Map<string, PluginFunction>;

    async execute() {
        let ctx = await this.walk();

        ctx.action = this.parser.parse(ctx.action);

        if (!Array.isArray(ctx.action)) {
            const plugin = this.plugins.get(ctx.action.use);
            if (plugin) {
                let result = await plugin(ctx);
                if (result) {
                    if (Array.isArray(result)) {
                        ctx.action.actions = result;
                    } else {
                        ctx = result;
                    }

                    if (!Array.isArray(ctx.action) && ctx.action.actions) {
                        this.addActions(ctx.action.actions, ctx);
                    }
                }
            }
        }
    }

    addActions(actions: Action[], ctx: Omit<ActionContext<Action>, "action">) {
        let { page, browser, frame } = ctx;
        this.add(
            ...actions.map(
                (a) =>
                    ({
                        page,
                        browser,
                        frame,
                        action: a,
                    } as ActionContext<Action>)
            )
        );
    }
}

class Jsonsep extends ActionExecutor {
    /** 清除所有插件 */
    clear() {
        this.plugins.clear();
        return this;
    }
    /** 注册插件 */
    use(name: string, plugin: PluginFunction) {
        this.plugins.set(name, plugin);
        return this;
    }

    registerParser(): ParserFunction[] {
        return [ArrayParser, PageParser, FrameParser];
    }
    registerPlugin(): Map<string, PluginFunction> {
        const plugins = new Map();
        plugins.set("condition", ConditionPlugin);
        plugins.set("frame", FramePlugin);
        plugins.set("function", FunctionPlugin);
        plugins.set("module", ModulePlugin);
        plugins.set("page", PagePlugin);
        return plugins;
    }
}

const json = require(path.resolve("./tests/test.json"));

launch(json.options)
    .then(async (browser) => {
        const [page] = await browser.pages();

        const jsonsep = new Jsonsep({
            page,
            actions: json.actions,
        });

        setTimeout(() => {
            jsonsep.stop();

            setTimeout(() => {
                jsonsep.start();
            }, 5000);
        }, 5000);

        while (!jsonsep.end()) {
            await jsonsep.execute();
        }
    })
    .catch((err) => {
        console.log(err);
    });

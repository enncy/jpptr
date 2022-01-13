import { EventEmitter } from "events";
import { launch, Page } from "puppeteer-core";
import { PluginFunction, JsonsepSchema } from "..";
import { Parser, ParserFunction } from "../parser";
import { ArrayParser } from "../parser/ArrayParser";
import { FrameParser } from "../parser/FrameParser";
import { PageParser } from "../parser/PageParser";
import { ActionContext, Action } from "../plugins";
import { ConditionPlugin } from "../plugins/condition";
import { FramePlugin } from "../plugins/frame";
import { FunctionPlugin } from "../plugins/function";
import { ModulePlugin } from "../plugins/module";
import { PagePlugin } from "../plugins/page";
import { Register } from "./register";
import { Walker } from "./walker";


export abstract class ActionExecutor extends Walker<ActionContext<Action>> {
    private parserRegister: Register<ParserFunction> = new Register();
    private pluginRegister: Register<PluginFunction> = new Register();
    public parser: Parser;
    public register: { plugin: Register<PluginFunction>; parser: Register<ParserFunction> };
    public currentContext: ActionContext<Action>;

    constructor({ page, actions }: { page: Page; actions?: Action[] }) {
        super();
        this.addActions(actions || [], { browser: page.browser(), page, frame: page.mainFrame() });
        this.registerPlugin(this.pluginRegister);
        this.registerParser(this.parserRegister);

        this.currentContext = this.peek(0);
        this.parser = new Parser(this.parserRegister.values());
        this.register = {
            plugin: this.pluginRegister,
            parser: this.parserRegister,
        };
    }

    protected abstract registerParser(parserRegister: Register<ParserFunction>): void;
    protected abstract registerPlugin(pluginRegister: Register<PluginFunction>): void;

    async execute() {
        let ctx = await this.walk();
        ctx.action = this.parser.parse(ctx.action);

        this.currentContext = ctx;

        if (!Array.isArray(ctx.action)) {
            const plugin = this.pluginRegister.get(ctx.action.use);
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

export class Jsonsep extends ActionExecutor {
    public static defaultParsers() {
        return new Register<ParserFunction>().use("array", ArrayParser).use("frame", FrameParser).use("page", PageParser);
    }

    public static defaultPlugins() {
        return new Register<PluginFunction>().use("condition", ConditionPlugin).use("frame", FramePlugin).use("function", FunctionPlugin).use("module", ModulePlugin).use("page", PagePlugin);
    }

    public static async createJsonsep(json: JsonsepSchema) {
        const browser = await launch(json.options);
        const [page] = await browser.pages();
        return new Jsonsep({ page, actions: json.actions });
    }

    registerParser(parserRegister: Register<ParserFunction>): void {
        parserRegister.useAll(Jsonsep.defaultParsers().entries());
    }
    registerPlugin(pluginRegister: Register<PluginFunction>): void {
        pluginRegister.useAll(Jsonsep.defaultPlugins().entries());
    }
}

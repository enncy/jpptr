import { ModuleRegister, Jpptr } from "../../src";
import { describe, it } from "mocha";
import { expect } from "chai";
import { ActionExecutor } from "../../src/core/executor";
import { ActionContext } from "../../src/core/types";

describe("02 register 外部模块注册测试", () => {
    const register = new ModuleRegister();
    const parsers = register.parser;
    const plugins = register.plugin;

    it("新增解析器", () => {
        parsers.use("test-parser", {
            parser({ action }: ActionContext<any>) {
                if (typeof action === "number") {
                    return {
                        use: "test-plugin",
                        href: "https://example.com",
                    };
                }
            },
        });
        expect(parsers.get("test-parser")?.parser({ action: 1 })).deep.eq({
            use: "test-plugin",
            href: "https://example.com",
        });
    });

    it("新增插件", () => {
        plugins.use("test-plugin", (opts: any) => {
            return [["goto", opts.action.href]];
        });
        expect(plugins.get("test-plugin")?.({ action: { href: "https://example.com" } } as any)).to.deep.eq([["goto", "https://example.com"]]);
    });

    it("调用模块,使一个数字1,变成可以让浏览器访问网页的动作", async () => {
        const executor = new ActionExecutor<any>({ register });

        executor.add({ action: 1 });
        const ctx = await executor.walk();
        if (ctx) {
            ctx.action = executor.parser.parse({ action: ctx.action });

            const plugin = plugins.get(ctx.action.use);
            const result = await plugin!(ctx);

            // @ts-ignore
            expect(result).eql([["goto", "https://example.com"]]);
        }
    });
});

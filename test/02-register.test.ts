import { Jpptr } from "../src";
import { describe, it } from "mocha";
import { expect } from "chai";

describe("02 register 外部模块注册测试", () => {
    const jpptr = new Jpptr();

    it("新增解析器", () => {
        jpptr.register?.parser?.use("test-parser", (action: any) => {
            if (typeof action === "number") {
                return {
                    use: "test-plugin",
                    href: "https://example.com",
                };
            }
        });
        expect(jpptr.register?.parser?.get("test-parser")?.(1)).deep.eq({
            use: "test-plugin",
            href: "https://example.com",
        });
    });

    it("新增插件", () => {
        jpptr.register.plugin.use("test-plugin", (opts: any) => {
            return [["goto", opts.action.href]];
        });
        expect(jpptr.register.plugin.get("test-plugin")?.({ action: { href: "https://example.com" } } as any)).to.deep.eq([["goto", "https://example.com"]]);
    });

    it("调用模块,使一个数字1,变成可以让浏览器访问网页的操作", async () => {
        jpptr.add({ action: 1 });
        const ctx = await jpptr.walk();
        if (ctx) {
            ctx.action = jpptr.parser.parse(ctx.action);

            const plugin = jpptr.register.plugin.get(ctx.action.use);
            const result = await plugin!(ctx);

            // @ts-ignore
            expect(result).eql([["goto", "https://example.com"]]);
        }
    });
});

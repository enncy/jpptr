import { describe, it } from "mocha";
import { expect } from "chai";
import { Parser, defaultParsers } from "../src";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const parser = new Parser(defaultParsers());

let gotoAction = {
    use: "function",
    name: "goto",
    args: ["https://www.baidu.com"],
};

let typeAction = {
    use: "function",
    name: "type",
    args: ["#kw", "jsonsep"],
};

describe("01 json parser 解析测试", () => {
    describe("插件模块解析", () => {
        describe("function", () => {
            it("goto", () => {
                // @ts-ignore
                expect(parser.parse(gotoAction)).eql(gotoAction);
            });

            it("type", () => {
                // @ts-ignore
                expect(parser.parse(typeAction)).eql(typeAction);
            });
        });

        describe("external", () => {
            it("close-dialog", () => {
                // @ts-ignore
                expect(
                    parser.parse({
                        use: "external",
                        name: "close-dialog",
                    })
                ).deep.eq({
                    use: "close-dialog",
                });
            });
        });
    });

    describe("数组解析", () => {
        it("goto", () => {
            expect(parser.parse(["goto", "https://www.baidu.com"])).deep.eq(gotoAction);
        });

        it("type", () => {
            expect(parser.parse(["type", "#kw", "jsonsep"])).deep.eq(typeAction);
        });
    });

    describe("选项解析", () => {
        it("page选项解析", () => {
            expect(
                parser.parse({
                    use: "function",
                    name: "goto",
                    args: ["https://www.baidu.com"],
                    page: -1,
                })
            ).deep.eq({
                use: "page",
                index: -1,
                actions: [{ use: "function", name: "goto", args: ["https://www.baidu.com"] }],
            });
        });

        it("frame选项解析", () => {
            expect(
                parser.parse({
                    use: "function",
                    name: "goto",
                    args: ["https://www.baidu.com"],
                    frame: "some_frame",
                })
            ).deep.eq({
                use: "frame",
                name: "some_frame",
                actions: [{ use: "function", name: "goto", args: ["https://www.baidu.com"] }],
            });
        });
    });

    describe("文件整体解析测试", () => {
        it("test.json actions => parsed.json", () => {
            const json = require("./test.json");

            const parsed = json.actions.map((a: any) => parser.parse(a));

            expect(parsed).is.deep.eq(JSON.parse(readFileSync(resolve("./test/parsed.json")).toString()));
        });
    });
});
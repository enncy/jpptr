import { describe, it } from "mocha";
import { expect } from "chai";
import { defaultParsers, Parser } from "../../src/parser";
import { readFileSync } from "fs";
import { resolve } from "path";
import { Jpptr } from "../../src";

const parser = new Parser(defaultParsers());

const gotoAction = {
    use: "function",
    name: "goto",
    args: ["https://www.example.com"],
};

const typeAction = {
    use: "function",
    name: "type",
    args: ["#kw", "jpptr"],
};

describe("01 json parser 解析测试", () => {
    describe("插件模块解析", () => {
        describe("function", () => {
            it("goto", () => {
                expect(parser.parse({ action: gotoAction })).deep.eq(gotoAction);
            });

            it("type", () => {
                expect(parser.parse({ action: typeAction })).deep.eq(typeAction);
            });
        });
    });

    describe("数组解析", () => {
        it("goto", () => {
            expect(parser.parse({ action: ["goto", "https://www.example.com"] })).deep.eq(gotoAction);
        });

        it("type", () => {
            expect(parser.parse({ action: ["type", "#kw", "jpptr"] })).deep.eq(typeAction);
        });
    });

    describe("选项解析", () => {
        it("page选项解析", () => {
            expect(
                parser.parse({
                    action: {
                        use: "function",
                        name: "goto",
                        args: ["https://www.example.com"],
                        page: -1,
                    },
                })
            ).deep.eq({
                use: "page",
                index: -1,
                actions: [{ use: "function", name: "goto", args: ["https://www.example.com"] }],
            });
        });

        it("frame选项解析", () => {
            expect(
                parser.parse({
                    action: {
                        use: "function",
                        name: "goto",
                        args: ["https://www.example.com"],
                        frame: "some_frame",
                    },
                })
            ).deep.eq({
                use: "frame",
                name: "some_frame",
                actions: [{ use: "function", name: "goto", args: ["https://www.example.com"] }],
            });
        });
    });

    describe("变量解析测试", () => {
        it("浅解析", () => {
            expect(
                parser.parse({
                    variables: {
                        name: "goto",
                    },
                    action: {
                        use: "function",
                        name: "#{name}",
                        args: ["https://www.example.com"],
                    },
                })
            ).deep.eq({
                use: "function",
                name: "goto",
                args: ["https://www.example.com"],
            });
        });

        it("深度对象解析", () => {
            expect(
                parser.parse({
                    variables: {
                        host: "www.example.com",
                    },
                    action: {
                        use: "function",
                        name: "goto",
                        args: ["https://#{host}"],
                    },
                })
            ).deep.eq({
                use: "function",
                name: "goto",
                args: ["https://www.example.com"],
            });
        });
    });

    describe("文件整体解析测试", () => {
        it("test.json actions => parsed.json", () => {
            const config = Jpptr.readJsonFile(resolve(__dirname, "./test.json"));
            const parsedJson = Jpptr.readJsonFile(resolve(__dirname, "./parsed.json"));

            const parsed = config.actions.map((a: any) =>
                parser.parse({
                    variables: {
                        username: "enncy",
                        password: "123456",
                        project: "jpptr",
                    },
                    action: a,
                })
            );

            expect(parsed).is.deep.eq(parsedJson);
        });
    });
});

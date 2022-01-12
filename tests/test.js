// @ts-check

const { describe, it } = require("mocha");
const { Jsonsep, start } = require("../../jsonsep/lib/index");

const path = require("path");

require("should");

const jsonsep = new Jsonsep();

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

describe("jsonsep 解析测试", () => {
    describe("对象解析", () => {
        it("goto", () => {
            // @ts-ignore
            jsonsep.parse(gotoAction).should.equals(gotoAction);
        });

        it("type", () => {
            // @ts-ignore
            jsonsep.parse(typeAction).should.equals(typeAction);
        });
    });

    describe("数组解析", () => {
        it("goto", () => {
            jsonsep.parse(["goto", "https://www.baidu.com"]).should.have.properties(gotoAction);
        });

        it("type", () => {
            jsonsep.parse(["type", "#kw", "jsonsep"]).should.have.properties(typeAction);
        });
    });

    describe("选项解析", () => {
        it("page选项解析", () => {
            jsonsep
                .parse({
                    use: "function",
                    name: "goto",
                    args: ["https://www.baidu.com"],
                    page: -1,
                })
                .should.have.properties({
                    use: "page",
                    index: -1,
                    actions: [{ use: "function", name: "goto", args: ["https://www.baidu.com"] }],
                });
        });

        it("frame选项解析", () => {
            jsonsep
                .parse({
                    use: "function",
                    name: "goto",
                    args: ["https://www.baidu.com"],
                    frame: "some_frame",
                })
                .should.have.properties({
                    use: "frame",
                    name: "some_frame",
                    actions: [{ use: "function", name: "goto", args: ["https://www.baidu.com"] }],
                });
        });
    });

    describe("运行测试", () => {
        it("运行", async () => {
            const json = require(path.resolve(__dirname, "./test.json"));
            await start(json);
        });
    });
});

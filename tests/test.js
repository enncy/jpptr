const { describe, it } = require("mocha");

const { start } = require("../../jsonsep");
const json  = require('./cx.json');

describe("launch test", () => {
    it("running", () => {
        start(json)
    });
});

// @ts-check
const { Jsonsep } = require("jsonsep");
const json = require("./test.json");

async function start() {
    // @ts-ignore
    const jsonsep = await Jsonsep.createJsonsep(json);
    while (!jsonsep.end()) {
        await jsonsep.execute();
    }
}

start();

// @ts-check
const { Jpptr } = require("jpptr");
const json = require("./test.json");

async function start() {
    // @ts-ignore
    const jpptr = await Jpptr.createJpptr(json);
    while (!jpptr.end()) {
        await jpptr.execute();
    }
}

start();

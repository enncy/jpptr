// @ts-check
const { Jpptr } = require("jpptr");
const config = require("./test.json");

async function start() {
    // @ts-ignore
    const jpptr = await Jpptr.createJpptr(config);
    while (!jpptr.end()) {
        await jpptr.execute();
    }
}

start();

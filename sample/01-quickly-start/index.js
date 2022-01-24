// @ts-check
const { Jpptr } = require("jpptr");
const path = require("path");

async function start() {
    // @ts-ignore
 
    const jpptr = await Jpptr.from(path.resolve(__dirname, "./test.json"));
    /** launch browser and create executor */
    const execute = await jpptr.createExecutor();

    await execute.executeAll();
}

start();

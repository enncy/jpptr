// @ts-check
const { Jpptr } = require("jpptr");
const path = require("path");

async function start() {
    /** 
     * 实例化 jpptr    
     */
    const jpptr = Jpptr.from(path.resolve(__dirname, "./test.json"));
    /** 启动浏览器 */
    const execute = await jpptr.createExecutor();
    /** 执行全部动作 */
    await execute.executeAll();
}

start();
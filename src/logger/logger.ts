const chalk = require("chalk");

export function log(level: string, ...message: any[]) {
    console.log(`${level.toLocaleUpperCase()} :`, ...message);
}

export function error(...message: any[]) {
    console.log(chalk.redBright("[ERROR] :"), ...message);
}

export function info(...message: any[]) {
    console.log("[INFO] :", ...message);
}

export function debug(...message: any[]) {
    console.log(chalk.bgGray("[DEBUG] :"), ...message);
}

import chalk from "chalk";
export function error(...message: any[]) {
    console.log(chalk.bgRedBright("[ERROR]"), ...message);
}
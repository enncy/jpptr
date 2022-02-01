import { ActionExecutor } from "../core";
import { JpptrOptions, Context, Action, ObjectAction } from "../core/types";
import pino from "pino";
import ora from "ora";
import chalk from "chalk";
import { PluginParams } from "./schema";
import { FunctionPluginParams } from "../plugins/function";
import { SonicBoomOpts } from "sonic-boom";
import { Frame, Page } from "puppeteer-core";

export type DebugOptions = SonicBoomOpts & {
    formatter?:
        | string
        | {
              (opts: Partial<{ step: number; time: number; page: Page; frame: Frame; action: ObjectAction }>):
                  | string
                  | undefined;
          };
};

export function createLogger(options: JpptrOptions) {
    const logger: pino.Logger | undefined =
        typeof options.debug === "object"
            ? pino(
                  {
                      base: null,
                      formatters: {
                          level(label, number) {
                              return { level: label };
                          },
                      },
                      timestamp: () => `,"time":"${new Date(Date.now()).toLocaleString()}"`,
                  },
                  pino.destination(options.debug)
              )
            : undefined;

    return logger;
}

export function startDebug(options: JpptrOptions, executor: ActionExecutor<Action>) {
    const logger = createLogger(options);
    const formatter = typeof options?.debug === "object" ? options.debug.formatter : undefined;
    let console = ora();

    let executeStart = 0;
    let executedTime = 0;

    logger?.info({
        msg: "jpptr start",
        time: Date.now(),
        launch: options.launch,
        variables: options.variables,
    });

    /** 执行开始 */
    executor.on("executestart", (ctx) => {
        console = ora();
        executeStart = Date.now();
        console.text = createOraText(formatter, { ...ctx, step: executor.step });
        console.start();
    });

    /** 执行结束 */
    executor.on("executefinish", (ctx) => {
        executedTime = Date.now() - executeStart;
        console.text = createOraText(formatter, { ...ctx, step: executor.step, executedTime });
        console.succeed();
        logger?.info(formatLoggerInfo({ ...ctx, step: executor.step }));
        end();
    });

    /** 执行错误 */
    executor.on("executeerror", (ctx, e) => {
        console.text = createOraText(formatter, { ...ctx, step: executor.step, more: e });
        console.fail();
        logger?.error(formatLoggerInfo({ ...ctx, step: executor.step }));
        end();
    });

    function end() {
        if (executor.end()) {
            logger?.info({
                msg: "jpptr end",
                time: Date.now(),
            });
            executor.removeAllListeners("executestart");
            executor.removeAllListeners("parsestart");
            executor.removeAllListeners("parsefinish");
            executor.removeAllListeners("executefinish");
            executor.removeAllListeners("executeerror");
        }
    }
}

/**
 * console 控制台输出
 */
export function createOraText(
    formatter: DebugOptions["formatter"],
    info: Context<Action> & { step: number; executedTime?: number; more?: string }
) {
    if (Array.isArray(info.action)) {
        return "";
    } else {
        if (typeof formatter === "function") {
            return (
                formatter({
                    step: info.step,
                    time: info.executedTime,
                    page: info.page,
                    frame: info.frame,
                    action: info.action,
                }) || ""
            );
        } else {
            let MORE = info.more || "";

            if (!Array.isArray(info.action)) {
                const use: keyof PluginParams = info.action.use as any;
                if (use === "function") {
                    const action = info.action as FunctionPluginParams;
                    MORE = space(chalk.greenBright(action.name), action.args);
                } else {
                    const { use, actions, ...args } = info.action;
                    MORE = Reflect.ownKeys(args).length ? maxString(JSON.stringify(args), 100) : "";
                }
            }

            /** 此动作步骤索引 */
            const step = chalk.blackBright(info.step.toString().padStart(2, "0"));
            /** 动作耗费的时间 */
            const time = chalk.blackBright((info.executedTime || 0).toString().padStart(4, "0") + "/ms");
            /** 页面 url */
            const page = info.page ? chalk.yellowBright(new URL(info.page.url()).hostname) : "";
            /** frame url */
            const frame = info.frame ? chalk.yellow(new URL(info.frame.url()).hostname) : "";
            /** frame 索引 */
            const frameIndex = chalk.yellow(
                info.frame?._id === info.page?.mainFrame()._id
                    ? 0
                    : info.page?.frames().findIndex((f) => f._id === info.frame?._id)
            );
            /** 插件名 */
            const plugin = chalk.blueBright(Array.isArray(info.action) ? "" : info.action?.use);
            /** 基础输出 */
            const base = chalk.blackBright(MORE);

            if (typeof formatter === "string") {
                return (
                    formatter
                        .replace("$step", step)
                        .replace("$time", time)
                        .replace("$page", page)
                        /** frameIndex 需要在 frame 之前 */
                        .replace("$frameIndex", frameIndex)
                        .replace("$frame", frame)
                        .replace("$plugin", plugin)
                        .replace("$base", base)
                );
            } else {
                return `[${step}][${time}][${page}][${frameIndex}][${plugin}] \t${base}`;
            }
        }
    }
}

function space(...args: any[]) {
    return maxString(args.join(" "), 100);
}

function maxString(str: string, len: number) {
    return str.length > len ? str.substring(0, len) + "..." : str;
}

function formatLoggerInfo(info: Context<Action> & { step: number; executedTime?: number; more?: string }) {
    return {
        step: info.step,
        page: info.page?.url(),
        frame: info.frame?.url(),
        time: info.executedTime,
        action: info.action,
        variables: info.variables,
        message: info.more,
        browser: info.browser?.wsEndpoint(),
    };
}

import { Page, Frame } from "puppeteer-core";

export async function executePageFunction(page: Page, frame: Frame, name: string, args: any[]) {
    const fun = Reflect.get(frame, name);
    if (fun) {
        if (typeof fun === "function") {
            await Reflect.apply(fun, frame, args);
        }
    } else {
        const pageFun = Reflect.get(page, name);
        if (pageFun) {
            if (typeof pageFun === "function") {
                await Reflect.apply(pageFun, page, args);
            }
        } else {
            // warning...
        }
    }
}
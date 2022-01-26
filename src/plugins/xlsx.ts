import { ObjectAction, Context } from "../core/types";

export function XlsxPlugin({ browser, page, frame, action }: Context<XlsxPluginParam>) {}

export interface XlsxPluginParam extends ObjectAction {
    path: string;
    dataFrame: Record<string, string>;
}

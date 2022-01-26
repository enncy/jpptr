import { ActionContext, ObjectAction } from ".";

export function XlsxPlugin({ browser, page, frame, action }: ActionContext<XlsxPluginParam>) {
    
}

export interface XlsxPluginParam extends ObjectAction {
    path: string;
    dataFrame: Record<string, string>;
}

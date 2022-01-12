import { ObjectAction } from "../..";
import { ActionParser } from "../types";
export declare class FrameParser implements ActionParser {
    parse(action: ObjectAction): ObjectAction | undefined;
}

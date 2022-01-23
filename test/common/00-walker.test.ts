import { describe, it } from "mocha";
import { expect } from "chai";
import { Walker } from "../../src";

const walker = new Walker();

walker.add(undefined, 1, 2, 3, 4, 5);

describe("00 walker 测试", () => {
    it("peek", () => {
        expect(walker.peek(0)).is.undefined;
    });
    it("add", () => {
        expect(walker.append(6).peek(-1)).eq(6);
    });
    it("walk", () => {
        expect(walker.walk()).is.undefined;
        expect(walker.walk()).eq(1);
    });
    it("back", () => {
        expect(walker.back().walk()).eq(1);
    });
    it("reWalk", () => {
        expect(walker.reWalk().walk()).is.undefined;
    });
    it("jump", () => {
        expect(walker.jump(-1).walk()).eq(6);
    });

    it("stop and start", async () => {
        walker.reWalk();
        while (!walker.end()) {
            const w = await walker.walk();
            if (w === 1) {
                // 停止动作
                walker.stop();
                expect(walker.isStop()).is.true;
                // 添加一个延时动作，此事件必须等到 start 调用后才能停止阻塞
                walker.add(async () => 0);
                expect(walker.peek(2)).is.instanceOf(Function);
                // 模拟延时
                setTimeout(() => {
                    // 解除暂停
                    walker.start();
                    expect(walker.isStop()).is.false;
                }, 3000);
            }
        }
    });

    it("remove", () => {
        expect(walker.reWalk().removeAt(1, 5).walk()).is.undefined;
    });
});

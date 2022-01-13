import EventEmitter from "events";

export class Walker<T> extends EventEmitter {
    /** walk step index */
    private index: number = 0;
    /** values */
    private list: T[];
    private _isStop: boolean = false;

    constructor(array?: T[]) {
        super();
        this.list = array || [];
    }

    /** walk , and return the item value  */
    walk() {
        if (this._isStop) {
            return new Promise<T>((resolve, reject) => {
                this.once("start", () => {
                    this.emit("walk");
                    resolve(this.list[this.index++]);
                });
            });
        } else {
            this.emit("walk");
            return this.list[this.index++];
        }
    }

    /** walk the previous step */
    back() {
        if (!this._isStop) {
            this.emit("back", this.index);
            this.index = this.index - 1;
        }
    }

    /** jump to some step */
    jump(index: number) {
        if (!this._isStop) {
            this.emit("jump", index);
            this.index = index;
        }
    }

    reWalk() {
        if (!this._isStop) {
            this.emit("reWalk", this.index);
            this.index = 0;
        }
    }

    /** make stop false */
    start() {
        this._isStop = false;
        this.emit("start");
    }

    /** stop walking */
    stop() {
        this._isStop = true;
        this.emit("stop");
    }

    /** is walk stop */
    isStop() {
        return this.isStop;
    }

    /** is walk end */
    end() {
        return this.index === this.list.length;
    }

    peek(index?: number) {
        this.emit("peek");
        return this.list[index || this.index];
    }

    /** add actions at next */
    add(...actions: T[]) {
        this.emit("add", actions);
        this.list.splice(this.index, 0, ...actions);
    }

    /** add actions at some step */
    addAt(index: number, ...actions: T[]) {
        this.emit("add", actions);
        this.list.splice(index, 0, ...actions);
    }

    /** remove current action and return */
    remove(count?: number) {
        this.emit("remove", this.index, count || 1);
        return this.list.splice(this.index, count || 1);
    }

    /** remove action at some step and return */
    removeAt(index: number, count?: number) {
        this.emit("remove", index, count);
        return this.list.splice(index, count);
    }
}
import EventEmitter from "events";

export interface WalkerEvents<T> {
    walk: T;
    peek: T;
    peekall: T[];
    add: [number, T[]];
    append: [number, T[]];
    remove: [number, number];

    update: number;

    back: number;
    jump: number;
    rewalk: number;

    start: number;
    stop: number;
 
}

export class Walker<T> extends EventEmitter {
    /** walk step index */
    protected _step: number = 0;
    /** values */
    private list: T[];
    private _isStop: boolean = false;

    constructor(array?: T[]) {
        super();
        this.list = array || [];
    }

    get step() {
        return this._step;
    }

    private set step(s) {
        this._step = s;
    }

    /** walk , and return the item value  */
    walk(): T | undefined | Promise<T | undefined> {
        if (this._isStop) {
            return new Promise<T>((resolve, reject) => {
                this.once("start", () => {
                    const item = this.list.at(this.step++);
                    this.emit("walk", item);
                    if (item) resolve(item);
                });
            });
        } else {
            const item = this.list.at(this.step++);
            this.emit("walk", item);
            return item;
        }
    }

    /** walk the previous step */
    back() {
        if (!this._isStop) {
            this.emit("back", this.step);
            this.emit("update", this.step);
            this.step = this.step - 1;
        }

        return this;
    }

    /** jump to some step */
    jump(step: number) {
        if (!this._isStop) {
            this.emit("jump", this.step);
            this.emit("update", step);
            this.step = step;
        }

        return this;
    }

    reWalk() {
        if (!this._isStop) {
            this.emit("rewalk", this.step);
            this.emit("update", this.step);
            this.step = 0;
        }

        return this;
    }

    /** make stop false */
    start() {
        this._isStop = false;
        this.emit("start", this.step);

        return this;
    }

    /** stop walking */
    stop() {
        this._isStop = true;
        this.emit("stop", this.step);

        return this;
    }

    /** is walk stop */
    isStop() {
        return this._isStop;
    }

    /** is walk end */
    end() {
        return this.step === this.list.length;
    }

    peek(step?: number) {
        const item = this.list.at(step || this.step);
        this.emit("peek", item);
        return item;
    }

    peekAll() {
        this.emit("peekall", this.list);
        return this.list;
    }

    /** add actions at tail */
    append(...actions: T[]) {
        this.emit("append", [this.list.length, actions]);
        this.list.splice(this.list.length, 0, ...actions);

        return this;
    }

    /** add actions at next */
    add(...actions: T[]) {
        this.emit("add", [this.step, actions]);
        this.list.splice(this.step, 0, ...actions);

        return this;
    }

    /** add actions at some step */
    addAt(step: number, ...actions: T[]) {
        this.emit("add", [step, actions]);
        this.list.splice(step, 0, ...actions);

        return this;
    }

    /** remove current action and return */
    remove(count?: number) {
        this.emit("remove", [this.step, count || 1]);
        this.list.splice(this.step, count || 1);

        return this;
    }

    /** remove action at some step and return */
    removeAt(index: number, count?: number) {
        this.emit("remove", [index, count]);
        this.list.splice(index, count);

        return this;
    }
}

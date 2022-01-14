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
    protected index: number = 0;
    /** values */
    private list: T[];
    private _isStop: boolean = false;

    constructor(array?: T[]) {
        super();
        this.list = array || [];
    }

    /** walk , and return the item value  */
    walk(): T | undefined | Promise<T | undefined> {
        if (this._isStop) {
            return new Promise<T>((resolve, reject) => {
                this.once("start", () => {
                    let item = this.list.at(this.index++);
                    this.emit("walk", item);
                    if (item) resolve(item);
                });
            });
        } else {
            let item = this.list.at(this.index++);
            this.emit("walk", item);
            return item;
        }
    }

    /** walk the previous step */
    back() {
        if (!this._isStop) {
            this.emit("back", this.index);
            this.emit("update", this.index);
            this.index = this.index - 1;
        }

        return this;
    }

    /** jump to some step */
    jump(index: number) {
        if (!this._isStop) {
            this.emit("jump", this.index);
            this.emit("update", index);
            this.index = index;
        }

        return this;
    }

    reWalk() {
        if (!this._isStop) {
            this.emit("rewalk", this.index);
            this.emit("update", this.index);
            this.index = 0;
        }

        return this;
    }

    /** make stop false */
    start() {
        this._isStop = false;
        this.emit("start", this.index);

        return this;
    }

    /** stop walking */
    stop() {
        this._isStop = true;
        this.emit("stop", this.index);

        return this;
    }

    /** is walk stop */
    isStop() {
        return this._isStop;
    }

    /** is walk end */
    end() {
        return this.index === this.list.length;
    }

    peek(index?: number) {
        let item = this.list.at(index || this.index);
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
        this.emit("add", [this.index, actions]);
        this.list.splice(this.index, 0, ...actions);

        return this;
    }


    /** add actions at some step */
    addAt(index: number, ...actions: T[]) {
        this.emit("add", [index, actions]);
        this.list.splice(index, 0, ...actions);

        return this;
    }

    /** remove current action and return */
    remove(count?: number) {
        this.emit("remove", [this.index, count || 1]);
        this.list.splice(this.index, count || 1);

        return this;
    }

    /** remove action at some step and return */
    removeAt(index: number, count?: number) {
        this.emit("remove", [index, count]);
        this.list.splice(index, count);

        return this;
    }
}

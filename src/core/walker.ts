import EventEmitter from "events";

/**
 * all the event trigger name of Walker,
 * and the type is the first argument of event handler
 */
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

/**
 * The Walker class provides an iterator-like function
 *
 * that helps you run, stop, jump, back, rerun, etc. the list of data
 *
 * @extends EventEmitter
 * @example
 * ```ts
 * interface Script{
 *      name: string
 * }
 * const scripts:Script[]  = [{name:'goto'},{name:'click'},{name:'close'}]
 * // 1. you can pass the data list to the constructor
 * const walker = new Walker<Script>(scripts)
 * // 2. or use function `add(...data)`
 * // walker.add(scripts)
 *
 *
 * walker.step      // 0
 * walker.walk()    // {name:'goto'}
 * walker.step      // 1
 *
 * walker.end()     // false
 * walker.walk()    // {name:'click'}
 * walker.walk()    // {name:'close'}
 * walker.end()     // true
 * walker.step      // 3
 *
 *
 *
 * walker.reWalk()  // reset the step of walker
 * walker.step      // 0
 *
 * // so if you just want to walk all the step :
 *
 * while(!walker.end()){
 *      const script = walker.walk()
 *      // ...do something
 * }
 *
 * ```
 */
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

    /**
     * fetch data in list, also let the step plus 1.
     *
     * if your data is promise function, use `await` to wait.
     */
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

    /**
     * let step minus 1
     */
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

    /**
     * make the step 0
     */
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

    /**
     * stop walking
     *
     * let all walk function waiting until method `walker.start()` is called
     */
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

    /**
     * get the data of a step, but do not update the step
     */
    peek(step?: number) {
        const item = this.list.at(step || this.step);
        this.emit("peek", item);
        return item;
    }

    /**
     * get all the data of a step, but do not update the step
     */
    peekAll() {
        this.emit("peekall", this.list);
        return this.list;
    }

    /** add data at tail */
    append(...actions: T[]) {
        this.emit("append", [this.list.length, actions]);
        this.list.splice(this.list.length, 0, ...actions);

        return this;
    }

    /** add data at next */
    add(...actions: T[]) {
        this.emit("add", [this.step, actions]);
        this.list.splice(this.step, 0, ...actions);

        return this;
    }

    /** add data at some step */
    addAt(step: number, ...actions: T[]) {
        this.emit("add", [step, actions]);
        this.list.splice(step, 0, ...actions);

        return this;
    }

    /** remove current data and return */
    remove(count?: number) {
        this.emit("remove", [this.step, count || 1]);
        this.list.splice(this.step, count || 1);

        return this;
    }

    /** remove data at some step and return */
    removeAt(index: number, count?: number) {
        this.emit("remove", [index, count]);
        this.list.splice(index, count);

        return this;
    }
}

interface StaticEventList {
    [key : string] : any;
}

class StaticEventEmitter {
    static _events : StaticEventList = {};

    static on(evtn : string, fn : Function) {
        if(!this._events.hasOwnProperty(evtn)) this._events[evtn] = [];
	    this._events[evtn].push(fn);
    }

    static off(evtn : string, fn : Function) {
        if(!this._events.hasOwnProperty(evtn)) return;
        var idx = this._events[evtn].indexOf(fn);
        if(idx < 0) return;
        this._events[evtn].splice(idx, 1);
    }

    static async emit(evtn : string, ...args: any[]) {
        if(!this._events.hasOwnProperty(evtn)) return;
        var fns = this._events[evtn].slice(0);
        if(fns.length < 1) return;
        for(var i = 0; i < fns.length; i++) await fns[i].apply(this, args);
    }
}

export {
    StaticEventEmitter
}

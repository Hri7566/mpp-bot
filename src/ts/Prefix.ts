import { Registry } from "./Registry";

class Prefix {
    static forEach(fn : (prefix : Prefix) => any) {
        Registry.forEach((val : any, key : string) => {
            if (key.startsWith('prefix')) {
                fn(val);
            }
        });
    }

    static registerDefaultPrefixes() {
        new Prefix('?');
    }

    accessor : string;

    constructor (acc : string) {
        this.accessor = acc.split(' ').join('');

        Registry.set(`prefix.${this.accessor}`, this);
    }
}

export {
    Prefix
}

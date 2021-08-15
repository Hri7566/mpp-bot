import { Client, Participant } from "./Client";
import { StaticEventEmitter } from "./StaticEventEmitter";
import { Prefix } from "./Prefix";
import { Database } from "./Database";
import { Command } from "./Command";
import { Group } from "./Group";
import { Registry } from "./Registry";

class Bot extends StaticEventEmitter {
    static client : Client;

    static db = Database;

    static command = Command;

    static registry : Map<string, any>;

    static start(cl : Client) {
        this.client = cl;

        Database.start();

        this.bind();
        this.bindClientListeners();

        this.registry = Registry;

        this.emit('ready');
    }

    static bind() {
        this.on('sendChat', async (str: String) => {
            this.client.sendArray([{
                m: 'a',
                message: `\u034f${str}`
            }]);
        });

        this.on('ready', () => {
            Command.registerDefaultCommands();
            Prefix.registerDefaultPrefixes();
        });
    }

    static bindClientListeners() {
        this.client.on('a', async msg => {
            Command.handle(msg);
        });

        this.client.on('ch', async msg => {
            Database.setRank(this.client.getOwnParticipant(), Group.OWNER);
        });
    }

    static sendChat(str : string) {
        this.emit('sendChat', str);
    }

    static getPartFuzzy(str : string) {
        for (let id of Object.keys(this.client.ppl)) {
            let p = this.client.ppl[id];
            if (p._id.includes(str.toLowerCase()) || p.name.toLowerCase().includes(str.toLowerCase())) {
                return p;
            }
        }
    }

    static [Symbol.toPrimitive]() {
        return 69;
    }
}

export {
    Bot
}

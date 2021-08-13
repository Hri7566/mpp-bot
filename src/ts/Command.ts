import { Client, InMessageA } from "./Client";
import { Database } from "./Database";
import { getGroupString, Group } from "./Group";
import { Prefix } from "./Prefix";
import { Registry } from "./Registry";

interface InMessageAExtended extends InMessageA {
    [key : string] : any;
}

class Command {
    static handle(msg : InMessageAExtended) {
        msg.args = msg.a.split(' ');

        Prefix.forEach(prefix => {
            if (msg.args[0].substring(0, prefix.accessor.length) == prefix.accessor) {
                msg.prefix = prefix;
            }
        });
        
        if (!msg.prefix) return;
        
        msg.cmd = msg.args[0].toLowerCase().substring(msg.prefix.accessor.length);
        msg.argcat = msg.a.substr(msg.args[0].length).trim();
        
        Command.forEach(async cmd => {
            for (let a of cmd.accessors) {
                if (a !== msg.cmd.toLowerCase()) continue;
                
                let user = await Database.findUser(msg.p);
                msg.user = user;
                
                if (user.permission == Group.BANNED) return;
                
                if (user.permission < cmd.permissionLevel) {
                    Bot.sendChat(`You don't have permission to use this command.`);
                    return;
                }

                if (msg.args.length - 1 < cmd.minimumArguments) {
                    Bot.sendChat(`Not enough arguments. Usage: ${this.getUsage(cmd.usage, msg.prefix.accessor)}`);
                    return;
                }

                try {
                    let out = await cmd.func(msg, Bot.client);
                    if (typeof out == 'string') {
                        Bot.sendChat(out);
                    }
                } catch (err) {
                    Bot.sendChat(`An error has occurred. Please try again later.`);
                    console.error(err);
                }

                break;
            }
        });
    }

    static getUsage(usage : string, prefixAccessor : string) {
        return usage.split(`{PREFIX}`).join(prefixAccessor);
    }

    static registerDefaultCommands() {
        new Command('help', ['help', 'cmds', 'h'], `{PREFIX}help (command)`, `List all commands or display usage info.`, 0, (msg, cl) => {
            if (!msg.args[1]) {
                let out = "Commands: ";
                Command.forEach(cmd => {
                    if (!cmd.hidden && msg.user.permission >= cmd.permissionLevel) {
                        out += `${msg.prefix.accessor}${cmd.accessors[0]} | `;
                    }
                });
                out = out.substring(0, out.length - 2).trim();
                return out;
            } else {
                let out;
                Command.forEach(cmd => {
                    for (let a of cmd.accessors) {
                        if (msg.argcat.toLowerCase() == a.toLowerCase()) {
                            out = `${cmd.description} Usage: ${Command.getUsage(cmd.usage, msg.prefix.accessor)}`;
                        }
                    }
                });
                if (out) {
                    return out;
                } else {
                    return `Couldn't find command '${msg.argcat}'.`;
                }
            }
        }, Group.USER, false);

        new Command('about', ['about', 'a'], `{PREFIX}about`, `Display info about the bot.`, 0, (msg, cl) => {
            return `This bot was written by Hri7566 using TypeScript and Webpack. Source might be available soon.`;
        }, Group.USER, false);

        new Command('js', ['js', 'eval'], `{PREFIX}js [eval]`, `Run JavaScript from inside the bot.`, 1, (msg, cl) => {
            try {
                let out = eval(msg.argcat);
                Bot.sendChat(`✔️ ${out}`);
            } catch (err) {
                Bot.sendChat(`❌ ${err}`);
            }
        }, Group.ADMIN, false);

        new Command('rank', ['rank', 'r'], `{PREFIX}rank (user)`, `Check a rank.`, 0, async (msg, cl) => {
            if (!msg.args[1]) {
                return `Your rank: ${getGroupString(msg.user.permission)} [${msg.user.permission}]`;
            } else {
                let user = await Database.findUser(Bot.getPartFuzzy(msg.argcat));
                if (!user) return `Could not find user '${msg.argcat}'.`;
                return `${user.name}'s rank: ${getGroupString(user.permission)} [${user.permission}]`;
            }
        }, Group.USER, false);

        new Command('setrank', ['setrank', 'sr'], `{PREFIX}setrank [user_id] [rank_id]`, `Set a user's rank.`, 2, async (msg, cl) => {
            let lastArg = msg.args[msg.args.length - 1];
            let part = Bot.getPartFuzzy(msg.argcat.substr(0, msg.argcat.length - lastArg.length).trim());
            let rank;

            try {
                rank = parseInt(lastArg);
            } catch (err) {
                return `Second argument must be an integer from -1 to 3`;
            }
            
            if (rank > msg.user.permission) {
                return `You cannot set a rank that high.`;
            }

            await Database.setRank(part, rank);
            let user = await Database.findUser(part);

            return `${user.name}'s rank is now ${getGroupString(user.permission)} [${user.permission}].`;
        }, Group.MOD, false);
    }

    static forEach(fn : (cmd : Command) => any) {
        Registry.forEach((val : any, key : string) => {
            if (key.startsWith('command')) {
                fn(val);
            }
        });
    }

    id : string;
    accessors : string[];
    usage : string;
    description : string;
    minimumArguments : number;
    func : ((msg : any, cl : Client) => (string | void)) | ((msg : any, cl : Client) => (Promise<string | void>));
    permissionLevel : number;
    hidden : boolean;

    constructor (id : string, acc : string[], usage : string, desc : string, minargs : number, func : ((msg : any, cl : Client) => (string | void)) | ((msg : any, cl : Client) => (Promise<string | void>)), group : Group, hidden? : boolean) {
        this.id = id;
        this.accessors = acc;
        this.usage = usage;
        this.description = desc;
        this.minimumArguments = minargs;
        this.func = func;
        this.permissionLevel = group;
        this.hidden = hidden || false;

        Registry.set(`command.${this.id}`, this);
    }
}

export {
    Command
}

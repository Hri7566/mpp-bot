import { Client, InMessageA } from "./Client";
import { Database, UserSchema } from "./Database";
import { getGroupString, Group } from "./Group";
import { Prefix } from "./Prefix";
import { Registry } from "./Registry";
import * as faker from "faker";

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
            let totalCmds = 0;

            Registry.forEach((obj, key) => {
                if (key.startsWith('command')) totalCmds++;
            });

            return `This bot was written by Hri7566 using TypeScript and Webpack. Total number of commands: ${totalCmds}`;
        }, Group.USER, false);

        new Command('id', ['id'], `{PREFIX}id`, `Get your ID.`, 0, (msg, cl) => {
            return `Your ID: ${msg.p._id}`;
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

        new Command('8ball', ['8ball', 'magic8ball', '8'], `{PREFIX}8ball [polar question]`, `By the laws of the known universe, this command HAS to be in every bot.`, 1, (msg, cl) => {
            const arr = [
                "It is Certain", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it",
                "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes",
                "Reply hazy, try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again",
                "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"
            ]

            return `${arr[Math.random() * arr.length]}, ${msg.p.name}.`;
        }, Group.USER, false);

        new Command('say', ['say'], `{PREFIX}say [string]`, `Make me talk.`, 1, (msg, cl) => {
            return msg.argcat;
        }, Group.USER, false);

        new Command('reverse', ['reverse'], `{PREFIX}reverse [string]`, `Reverse text.`, 1, (msg, cl) => {
            let reversed = msg.argcat.split('').reverse().join('')
            return `Reversed: ${reversed}`;
        }, Group.USER, false);

        new Command('gamemode', ['gamemode'], `{PREFIX}gamemode (survival|creative|spectator|adventure)`, `Change your gamemode.`, 0, (msg, cl) => {
            let gamemode = 'survival';
            if (msg.args[1]) {
                let regex = /(survival|creative|adventure|spectator)/i;

                if (!msg.user.flags.hasOwnProperty('gamemode')) msg.user.flags.set('gamemode', gamemode);
                if (!regex.test(msg.args[1])) return `Your gamemode can only be survival, creative, spectator, or adventure.`;

                msg.user.flags.set('gamemode', msg.args[1].toLowerCase());
                Database.setUser(msg.user);

                return `Your gamemode was set to ${msg.user.flags.get('gamemode')} mode.`;
            } else {
                if (msg.user.flags.get('gamemode')) {
                    gamemode = msg.user.flags.get('gamemode');
                }
                return `Your current gamemode is ${gamemode} mode.`;
            }
        }, Group.USER, true);

        let ensureInventory = (user : UserSchema) => {
            let hasInv = user.flags.has('inventory');

            if (hasInv == false) {
                user.flags.set('inventory', new Map());
                Database.setUser(user);
            }

            return user.flags.get('inventory');
        }

        interface ItemSchema {
            id: string;
            name: string;
            count: number;
            flags: Map<string, any>;
        }

        new Command('inventory', ['inventory', 'inv'], `{PREFIX}inventory (user)`, `Check inventory.`, 0, async (msg, cl) => {
            let user = msg.user;

            if (msg.args[1]) user = await Database.findUser(Bot.getPartFuzzy(msg.argcat));
            if (!user || typeof user == 'undefined') return `Could not find user '${msg.argcat}'.`;

            let inventory : Map<string, ItemSchema> = ensureInventory(user);

            let out = msg.args[1] ? `${user.name}'s inventory: ` : `Inventory: `;
            let orig = out;

            inventory.forEach((item, key) => {
                out += `${item.name} (x${item.count}) | `;
            });

            if (out.length <= orig.length) {
                out += "(none)";
            } else {
                out = out.substr(0, out.length - 2).trim();
            }

            return out;
        }, Group.USER, false);

        let ensureBalance = (user : UserSchema) => {
            let hasBal = user.flags.has('balance');

            if (hasBal == false) {
                user.flags.set('balance', 0);
                Database.setUser(user);
            }

            return user.flags.get('balance');
        }

        let balFormat = (bal : number) => {
            return `$${bal.toFixed(2)}`;
        }

        new Command('balance', ['balance', 'bal'], `{PREFIX}balance (user)`, `Check balance.`, 0, async (msg, cl) => {
            let user = msg.user;

            if (msg.args[1]) user = await Database.findUser(Bot.getPartFuzzy(msg.argcat));
            if (!user || typeof user == 'undefined') return `Could not find user '${msg.argcat}'.`;

            let bal : number = ensureBalance(user);

            let out = msg.args[1] ? `${user.name}'s balance: ${balFormat(bal)}` : `Balance: ${balFormat(bal)}`;

            return out;
        }, Group.USER, false);

        new Command('roll', ['roll'], `{PREFIX}roll`, `Roll a die.`, 0, (msg, cl) => {
            let dice : string = "⚀⚁⚂⚃⚄⚅";
            let r : number = Math.random() * 5;
            return `Die: ${Math.ceil(r)} ${dice.charAt(r)}`
        }, Group.USER, false);

        new Command('eat', ['eat'], `{PREFIX}eat (food)`, `Eat food.`, 0, (msg, cl) => {
            let foodArr = [
                'a redcurrant', 'a nut', 'a jujube', 'a kiwi fruit', 'a blood orange', 'a raspberry',
                'a cucumber', 'an apricot', 'a mandarine', 'a star fruit', 'a date', 'a tomato', 'a blackberry',
                'a grapefruit', 'a satsuma', 'a tangerine', 'a watermelon', 'a goji berry', 'a gooseberry',
                'a pineapple', 'a chili pepper', 'an elderberry', 'a pomelo', 'a coconut', 'a pear', 'a lychee',
                'a quince', 'an avocado', 'a boysenberry', 'a persimmon', 'a clementine', 'a lime', 'a passionfruit',
                'a tamarillo', 'a grape', 'a banana', 'a honeydew', 'a tomato', 'a peach', 'a strawberry', 'an apple',
                'mushrooms', 'bacon', 'a sun-dried tomato', 'meatballs', 'ham', 'grilled onions', 'anchovies', 'green peppers',
                'sausage', 'garlic', 'hot sauce', 'artichoke', 'pineapple', 'spinach', 'green peppers', 'olives', 'pepperoni',
                'onions', 'meatballs', 'cheese', 'tomato sauce', 'ground beef', 'feta', 'cheese sauce', 'toast', 'a stick of butter',
                'margarine', 'steak', 'an entire tub of mayonnaise', 'a cheeseburger', 'a hamburger', 'a raw beef patty', 'a turkey leg', 'a chicken leg',
                'a turkey breast', 'a chicken breast', 'lobster', 'a baguette', 'an entire bottle of ketchup', 'an entire bottle of mustard',
                'chocolate sprinkles', 'cake', 'all of the salt in the salt shaker', 'all of the pepper in the pepper grinder',
                'lambchops', 'porkchops', 'an entire head of lettuce', 'PB&J', 'scrambled eggs', 'an omelette',
                'chocolate', 'a burrito', 'bread', 'cabbage'
            ];

            let food = foodArr[Math.floor(Math.random() * foodArr.length)];
            if (msg.args[1]) food = msg.argcat;
            return `${msg.p.name} ate ${food}.`;
        }, Group.USER, false);
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

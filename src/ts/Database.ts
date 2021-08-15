import * as idb from 'idb';
import { Participant } from './Client';
import { Group } from './Group';

interface UserSchema {
    _id : string;
    name : string;
    color : string;
    permission : Group;
    flags : Map<string, any>;
}

class Database {
    static db : idb.IDBPDatabase;

    static async start() {
        this.db = await idb.openDB('mpp', 2, {
            upgrade(db) {
                let store = db.createObjectStore('users', {
                    keyPath: "_id"
                });

                store.createIndex('name', 'name', {
                    unique: false
                });
        
                store.createIndex('permission', 'permission', {
                    unique: false
                });
            }
        });
    }

    static async getUser(_id : string) {
        let user = await this.db.get('users', _id);
        return user;
    }
    
    static async setUser(user : UserSchema) {
        return await this.db.put('users', user);
    }

    static async findUser(p : Participant) : Promise<UserSchema> {
        let already = await this.getUser(p._id);
        if (already) return already;

        let user : UserSchema = {
            _id: p._id,
            name: p.name,
            color: p.color,
            permission: Group.USER,
            flags: new Map()
        }

        await this.setUser(user);

        return user;
    }

    static async setRank(p : Participant, rank : Group) {
        let user = await this.findUser(p);
        user.permission = rank;
        this.setUser(user);
    }
}

export {
    Database,
    UserSchema
}

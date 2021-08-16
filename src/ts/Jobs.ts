import { Bot } from "./Bot";
import { Database, UserSchema } from "./Database";
import { Registry } from "./Registry";

const JobsData : Record<string, any> = {
    "butcher": {
        "displayName": "Butcher",
        "min": 10,
        "max": 25
    },
    "baker": {
        "displayName": "Baker",
        "min": 15,
        "max": 30
    },
    "stone": {
        "displayName": "Stonemason",
        "min": 25,
        "max": 50
    },
    "weaver": {
        "displayName": "Weaver",
        "min": 45,
        "max": 75
    },
    "wine": {
        "displayName": "Winemaker",
        "min": 50,
        "max": 100
    },
    "farmer": {
        "displayName": "Farmer",
        "min": 65,
        "max": 115
    },
    "watchman": {
        "displayName": "Watchman",
        "min": 75,
        "max": 150
    },
    "cobbler": {
        "displayName": "Cobbler",
        "min": 100,
        "max": 175
    },
    "roofer": {
        "displayName": "Roofer",
        "min": 125,
        "max": 200
    },
    "locksmith": {
        "displayName": "Locksmith",
        "min": 150,
        "max": 225
    },
    "tanner": {
        "displayName": "Tanner",
        "min": 175,
        "max": 250
    },
    "merchant": {
        "displayName": "Merchant",
        "min": 200,
        "max": 275
    },
    "carpenter": {
        "displayName": "Carpenter",
        "min": 250,
        "max": 350
    },
    "cook": {
        "displayName": "Cook",
        "min": 275,
        "max": 400
    },
    "blacksmith": {
        "displayName": "Blacksmith",
        "min": 300,
        "max": 450
    }
}

class Job {
    static workStarted = false;

    static async workTick() {
        setTimeout(() => {
            this.workTick();
        }, 5000);
        let labor = await Job.getAllLabor();

        let r = Math.random();
        if (r > 0.02 * labor.length) return; // ANCHOR Job Chance

        let winner = labor[Math.floor(Math.random() * labor.length)];
        let inRoom = false;

        for (let id of Object.keys(Bot.client.ppl)) {
            let p = Bot.client.ppl[id];
            if (p._id == winner._id) inRoom = true;
        }

        if (inRoom) {
            let job : Job = Registry.get(`job.${winner.flags.get('job')}`)
            let money = job.min + (Math.floor((Math.random() * (job.max - job.min)) * 10)/10);
            Bot.sendChat(`${winner.name} worked as a ${job.displayName} and got ${Job.balFormat(money)}.`);
            winner.flags.set('balance', winner.flags.get('balance') + money);
            Database.setUser(winner);
        }

        winner.flags.set('job', 'none');
        Database.setUser(winner);
    }

    static balFormat(bal : number) {
        return `$${bal.toFixed(2)}`;
    }

    static async getAllLabor() : Promise<UserSchema[]> {
        let arr : UserSchema[] = [];

        for (let id of Object.keys(Bot.client.ppl)) {
            let p = Bot.client.ppl[id];
            let user = await Database.findUser(p);
            this.ensureBalance(user);
            this.ensureLabor(user);
            if (user.flags.get('job') !== 'none') {
                arr.push(user);
            }
        }

        return arr;
    }

    static ensureLabor(user : UserSchema) {
        let existsJobData = user.flags.has('job');

        if (existsJobData == false) {
            user.flags.set('job', 'none');
            Database.setUser(user);
        }

        return user.flags.get('job');
    }

    static ensureBalance(user : UserSchema) {
        let hasBal = user.flags.has('balance');

        if (hasBal == false) {
            user.flags.set('balance', 0);
            Database.setUser(user);
        }

        return user.flags.get('balance');
    }

    static setJob(user : UserSchema, jobid : string) {
        this.ensureBalance(user);
        this.ensureLabor(user);

        let hasJob = false;

        let jobs = this.getJobList();
        if (jobs.indexOf(user.flags.get('job')) !== -1) hasJob = true;

        user.flags.set('job', jobid);
        Database.setUser(user);
    }

    static hasJob(user : UserSchema) {
        return this.ensureLabor(user) !== 'none';
    }

    static getJobList() : string[] {
        let arr : string[] = [];
        this.forEach(job => {
            arr.push(job.id);
        });
        return arr;
    }

    static forEach(fn : (job : Job) => any) {
        Registry.forEach((val : any, key : string) => {
            if (key.startsWith('job')) {
                fn(val);
            }
        });
    }

    static registerDefaultJobs() {
        for (let id of Object.keys(JobsData)) {
            let job = JobsData[id];
            job.id = id;
            new Job(job);
        }
    }

    id : string;
    displayName : string;
    min : number;
    max : number;

    constructor (data : Job) {
        this.id = data.id;
        this.displayName = data.displayName;
        this.min = data.min;
        this.max = data.max;

        Registry.set(`job.${this.id}`, this);
    }
}

export {
    Job
}

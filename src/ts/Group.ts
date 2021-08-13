enum Group {
    USER = 0,
    MOD = 1,
    ADMIN = 2,
    OWNER = 3,
    BANNED = -1
}

let getGroupString = (num : number) => {
    switch (num) {
        case 0: return 'User';
        case 1: return 'Moderator';
        case 2: return 'Administrator';
        case 3: return 'Owner';
        case -1: return 'Banned';
    }
}

export {
    Group,
    getGroupString
}

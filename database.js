import mongoose from "mongoose";

const adminDB = mongoose.createConnection('mongodb://localhost:27017/dbAdmin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userDB = mongoose.createConnection('mongodb://localhost:27017/dbUser', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

adminDB.on('error', console.error.bind(console, 'AdminDB connection error:'));
adminDB.once('open', () => {
    console.log('Connected to dbAdmin!');
});

userDB.on('error', console.error.bind(console, 'UserDB connection error:'));
userDB.once('open', () => {
    console.log('Connected to dbUser!');
});

export { adminDB, userDB };

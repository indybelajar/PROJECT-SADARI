// db.js
import mongoose from "mongoose";

const adminDB = mongoose.createConnection('mongodb://localhost:27017/dbAdmin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userDB = mongoose.createConnection('mongodb://localhost:27017/dbUser', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

adminDB.on('error', (err) => {
    console.error('AdminDB connection error:', err);
});
adminDB.once('open', () => {
    console.log('Connected to dbAdmin!');
});

userDB.on('error', (err) => {
    console.error('UserDB connection error:', err);
});
userDB.once('open', () => {
    console.log('Connected to dbUser!');
});

export { adminDB, userDB };

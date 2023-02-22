const mongoose = require('mongoose');

const username = encodeURIComponent('aibaaki9');
const pass = encodeURIComponent('1L0veGoIT');
const cluster = "cluster0.ixvchmc.mongodb.net";
const uriDb = `mongodb+srv://${username}:${pass}@${cluster}/?retryWrites=true&w=majority`;

const connectMongo = async () => {
    return mongoose.connect(uriDb, {
        promiseLibrary: global.Promise,
        useNewUrlParser: true
    });
}

module.exports = {
    connectMongo
}
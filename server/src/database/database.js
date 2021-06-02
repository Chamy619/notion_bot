const mongoose = require('mongoose');
const {mongoURI} = require('../../config/databaseURI.js');

let database = null;

const connect = () => {
    if (database) {
        console.log('Already connected');
        return;
    }
    
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    database = mongoose.connection;

    database.once('open', async () => console.log('MongoDB connected...'));
    database.on('error', () => console.log('MongoDB connect failed'));
}

const disconnect = () => {
    if (!database) {
        return;
    }

    mongoose.disconnect();
}

module.exports = {
    connect,
    disconnect
};
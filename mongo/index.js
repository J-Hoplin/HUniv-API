const mongoose = require('mongoose');
const config = require('../config/mongo-config.json');

// mongoose connect callback : https://mongoosejs.com/docs/connections.html#callback
const connect = () => {
    if (process.env.MODE !== 'production') {
        mongoose.set('debug', true); // enable logging collection methods + arguments to the console/file
    }
    mongoose.connect(
        `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/admin`,
        {
            dbName: config.db,
        },
        (error) => {
            if (error) {
                console.error(`MongoDB connection error : ${error}`);
            } else {
                console.log('MongoDB connection success');
            }
        },
    );
};

// If mongoose connection error
// https://mongoosejs.com/docs/connections.html#error-handling
mongoose.connection.on('error', (error) => {
    console.error(`Connection Error : ${error}`);
});
// If mongoose disconnected error
mongoose.connection.on('disconnected', () => {
    console.error('MongoDB disconnected. Try reconnect to MongoDB');
    connect();
});

module.exports = connect;

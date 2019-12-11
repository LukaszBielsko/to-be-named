const mongoose = require('mongoose')


const startDb = function () {
    mongoose.connect('mongodb://localhost:27017/settlementHistoryDB',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    const db = mongoose.connection;

    db.on('error', () => {
        console.log('FAILED to connect to mongoDB')
    });

    db.once('open', () => {
        console.log('Connected to mongoDB')
    })
};

module.exports = startDb

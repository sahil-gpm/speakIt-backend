const mongoose = require('mongoose')


const connectToMongo = () => {

    mongoose.connect("mongodb://localhost:27017/speakit")
        .then(() => {
            console.log("Connected with the database");
        }).catch(() => {
            console.log("Connection with the database failed");
        })
}

module.exports = connectToMongo
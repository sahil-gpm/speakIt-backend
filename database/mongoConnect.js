const mongoose = require('mongoose')


const connectToMongo = () => {

    mongoose.connect("mongodb+srv://sahilmongo:sahilemitrr@speak-emitrr.7zapeoq.mongodb.net/?retryWrites=true")
        .then(() => {
            console.log("Connected with the database");
        }).catch((e) => {
            console.log(e.message);
        })
}

module.exports = connectToMongo
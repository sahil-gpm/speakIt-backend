const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = Schema({
    email: { type: String, unique: true,required:true },
    password: { type: String, required: true },
    creation: { type: Date, default: new Date().toDateString() },
    hindi : { type: Number, default: 0 },
    english : { type: Number, default: 0 },
    german : { type: Number, default: 0 },
    french : { type: Number, default: 0 },
    progress : {type : Number,default : 0}
})

const User = mongoose.model("users",userSchema)
module.exports = User 
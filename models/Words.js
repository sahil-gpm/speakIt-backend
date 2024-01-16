const mongoose = require('mongoose')
const { Schema } = mongoose

const wordSchema = Schema({
    word: { type: Object, required: true, unique: true },
    options: { type: Object, required: true, unique: true },
})

const Word = mongoose.model("words",wordSchema)
module.exports = Word 
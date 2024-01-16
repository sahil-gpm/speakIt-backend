const mongoose = require('mongoose')
const { Schema } = mongoose

const sentenceSchema = Schema({
    sentence: { type: Object, required: true, unique: true },
    options: { type: Object, required: true, unique: true },
})

const Sentence = mongoose.model("sentences",sentenceSchema)
module.exports = Sentence 
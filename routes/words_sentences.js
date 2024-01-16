const Sentence = require('../models/Sentences')
const Word = require('../models/Words')
const router = require('express').Router()

router.post("/add-word", async (req, res) => {
   try {
      const newWord = new Word({
         //single object
         word : req.body.word,

         //arrays 
         options : req.body.options
      })
      await newWord.save() //saving the new word
      res.status(200).json({ data: data })
   } catch (e) {
      res.status(404).json({ messgae: e })
   }
})

router.post("/add-sentence", async (req, res) => {
   try {
      const newSentence = new Sentence({
         //single object
         sentence : {
            hindi:req.body.hindi,
            english:req.body.english,
            french:req.body.frech,
            german:req.body.german
         },

         //arrays 
         options :{
            hindi:req.body.hindiOptions,
            english:req.body.englishOptions,
            french:req.body.frechOptions,
            german:req.body.germanOptions
         }
      })
      await newSentence.save() //saving the new word
      res.status(200).json({ data: data })
   } catch (e) {
      res.status(404).json({ messgae: e })
   }
})

router.post("/fetch_words", async (req, res) => {
   try {
      const data = await Word.find({})
      res.status(200).json({ data: data })
   } catch (e) {
      res.status(404).json({ messgae: e })
   }

})

router.post("/fetch_sentences", async (req, res) => {
   try {
      const data = await Sentence.find({})
      res.status(200).json({ data: data })
   } catch (e) {
      res.status(404).json({ messgae: e })
   }
})

module.exports = router
const User = require('../models/User')
const router = require('express').Router()

router.post("/set-hindi-progress", async (req, res) => {
    try {
        await User.findOneAndUpdate({ email: req.body.email }, {
            hindi: req.body.score
        })
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(400).json({ success: false })
    }
})

router.post("/set-english-progress", async (req, res) => {
    try {
        await User.findOneAndUpdate({ email: req.body.email }, {
            english: req.body.score
        })
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(400).json({ success: false })
    }
})

router.post("/set-german-progress", async (req, res) => {
    try {
        await User.findOneAndUpdate({ email: req.body.email }, {
            german: req.body.score
        })
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(400).json({ success: false })
    }
})

router.post("/set-french-progress", async (req, res) => {
    try {
        await User.findOneAndUpdate({ email: req.body.email }, {
            french: req.body.score
        })
        return res.status(200).json({ success: true })
    } catch (error) {
        return res.status(400).json({ success: false })
    }
})

router.post("/get-all-users-progress", async (req, res) => {

    try {
        const leaderBoard = []
        const users = await User.find({}, { email: 1, hindi: 1, english: 1, french: 1, german: 1 })

        //getting overall progress
        Array.from(users).forEach((user)=>{
            const progress = (user.hindi + user.english + user.french + user.german)/2
            const email = user.email
            leaderBoard.push({
                email,
                progress
            })
        })

        //sorting the array based on progress
        leaderBoard.sort((a, b) => {
            return b.progress - a.progress;
        });

        return res.status(200).json({ success: true , leaderBoard:leaderBoard})
    } catch (error) {
        return res.status(400).json({ success: false })
    }
})



module.exports = router
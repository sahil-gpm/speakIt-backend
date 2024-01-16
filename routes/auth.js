const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

const User = require('../models/User')
const fetchUser = require('../middleware/fetchUser')
const { body, validationResult } = require('express-validator')
dotenv.configDotenv()

router.post("/create-new-account",body('email').isEmail().isLength({min:7,max:60}),body('password').isLength({min:3,max:20}),async (req, res) => {

    //validation
    const dataErrors = validationResult(req)
    if(!dataErrors.isEmpty()){
        return res.status(400).send({success:false})
    }
    try {
        const salt = await bcrypt.genSalt(10)
        const pass = await bcrypt.hash(req.body.password, salt)
        const newuser = new User({
            email: req.body.email,
            password: pass
        })
        //creating new user account
        await newuser.save()
        return res.json({ success: true, authtoken: jwt.sign({ payload: newuser.id }, process.env.KEY) })
    } catch (e) {
        return res.status(400).json({ success: false, message: e.message})
    }
})


router.post("/login-into-account",body('email').isEmail().isLength({min:7,max:60}),body('password').isLength({min:3}),async (req, res) => {

    //validation
    const dataErrors = validationResult(req)
    if(!dataErrors.isEmpty()){
        return res.status(400).send({success:false})
    }

    const email = req.body.email
    const user = await User.findOne({ email })

    if (!user) {
        return res.status(400).json("Invalid credentials")
    } else {
        //else compare the passsowrd
        const passowordComparison = await bcrypt.compare(req.body.password, user.password)
        if (passowordComparison) {
            return res.status(200).json({ success: true, authtoken: jwt.sign({ payload: user.id }, process.env.KEY) })
        } else {
            return res.status(400).json({ error: "Try to login with valid credentials" })
        }
    }
})


router.post("/get-user-data", fetchUser, async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password")
        res.json({ user })
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
})

module.exports = router
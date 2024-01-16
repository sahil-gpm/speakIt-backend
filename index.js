const express = require('express')
const cors = require('cors')
const connectToMongo = require('./database/mongoConnect')
const app = express()

//adding required middlewares
app.use(express.json())
app.use(cors({
    origin : process.env.FRONTEND
})) 

//connect with the database
connectToMongo()

//required routes
app.use("/api/words_sentences",require('./routes/words_sentences'))
app.use("/api/auth",require('./routes/auth'))
app.use("/api/progress",require('./routes/progress'))

app.get("/",(req,res)=>{
    res.json({message:"hello"})
})

app.listen(3001,()=>{
    console.log("Server running on port " + 3001);
})


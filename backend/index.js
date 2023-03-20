const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb+srv://survey_system:survey_system@firstcluster.fcybv.mongodb.net/?retryWrites=true&w=majority'
const cors = require('cors')

const app = express()

app.use(cors())
mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection
con.on('open',()=>{
    console.log('connected');
})
app.use(express.json())


const userRoute = require('./routes/userRoute')
app.use('/user',userRoute)

app.listen(9000,()=>{
    console.log('Server started at port 9000')
})
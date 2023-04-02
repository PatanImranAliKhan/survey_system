const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    username : {
        type:String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    address:{
        type: String,
        required : true
    },
    mobile :{
        type:Number,
        required:true
    },
    password :{
        type : String,
        required : true
    }
})

module.exports =  mongoose.model('User', userschema)
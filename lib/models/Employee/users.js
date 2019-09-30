const mongoose = require('mongoose')

const users = new mongoose.Schema({
    username:{
        type:String,        
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
})

const Users = mongoose.model('Employee',user)
module.exports = Users
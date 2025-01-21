const mongoose = require('mongoose');


const users= mongoose.Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cart_data:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('users',users);
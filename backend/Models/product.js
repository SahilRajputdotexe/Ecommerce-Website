const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id:{
        type:Number,    
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    available:{
        type:Boolean,
        required:true,
        default:true
    },
});

module.exports = mongoose.model('products',productSchema);

//API for user authentication

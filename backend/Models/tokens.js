const mongoose = require('mongoose');


const TokenType=Object.freeze({
    ACCESS,
    REFRESH,
    FORGOT_PASSWORD
}) 

const tokenSchema = mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    expiry:{
        type:Date,
        required:true
    },
    isExpired:{
        type:Boolean,
        required:true
    },
    isRevoked:{
        type:Boolean,
        required:true
    },
    type:{
        type:TokenType,
        required:true
    }
});
const tokens=mongoose.model('tokens',tokensSchema);
module.exports = {tokens,TokenType};



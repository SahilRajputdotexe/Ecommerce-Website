const express= require("express")
const router=express.Router()
const tokens=require("../Models/tokens")



//token logic

function generateToken(user,type,expiry ){

 
    const data={
        user:{
            id:user.id,
            email:user.email,
            name:user.name
        },
        expiry:expiry,
    }
   
    const token = jwt.sign(data,'secret_ecom',expiry)
    const newToken = new tokens ({
        token:token,
        expiry:expiry,
        isExpired:false,
        isRevoked:false,
        type:type
    })
    tokens.create(newToken);

    return token;
}

function generateAccessToken(user){
    generateToken(user,TokenType.ACCESS,process.env.ACCESS_TOKEN_EXPIRY);
}

function generateRefreshToken(user){
    generateToken(user,TokenType.REFRESH,process.env.REFRESH_TOKEN_EXPIRY);
}

function isExpired(token){
    return token.expiry < Date.now();
}

function isRevoked(token){
    return token.isRevoked;
}


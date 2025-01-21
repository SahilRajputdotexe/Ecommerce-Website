const express= require("express")
const router = express.Router()
const users= require("../Models/users")



//API for user authentication

app.post('/register', async (req, res) => {

    let user = await users.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success:0, message:"User already exists"});
    }
    cart={};
    for (let i=1; i<=300; i++){
        cart[i]=0;
    }
    const newUser = new users({
        name:req.body.name,
        email:req.body.email,
        password:await hashPassword(req.body.password),
        cart_data:cart
    });

    await users.create(newUser);


    const token=generateAccessToken(user);
    res.json({success:1, token:token});

});


app.post('/login', async (req, res) => {
    let user= await users.findOne({email:req.body.email});

    if(!user){
        return res.status(400).json({success:0, message:"User does not exist"});
    }

    if(bcrypt.compareSync(req.body.password, user.password)){
        const data={
            user:{
                id:user.id,
                email:user.email,
                name:user.name
            }
        }
        const token=jwt.sign(data,'secret_ecom');
        res.json({success:1, token:token});
    }
    else{
        return res.status(400).json({success:0, message:"Invalid password"});
    }

});

//fetch user
    const fetchUser = async (req, res,next) => {
        const token=req.header('auth-token');
        if(!token){
            return res.status(401).json({success:0, message:"Access Denied"});
        }
        else{
            try {
                const data=jwt.verify(token,'secret_ecom');
                req.user = data.user;
                console.log(req.user);
                next();
            } catch (error) {
                console.log(error);
                res.status(401).json({success:0, message:"Invalid Token"});
            }
        
        }
    }
//cart data 

app.get('/getcartdata',fetchUser,async (req, res) => {
    let user= await users.findOne({_id:req.user.id});
    
    res.json({success:1, cart_data:user.cart_data});
});

app.post('/addtocart', fetchUser,async (req, res) => {  
    console.log(req.user)
    let user= await users.findOne({_id:req.user.id});
    user.cart_data[req.body.Itemid]+=1;
    await users.findOneAndUpdate({_id:req.user.id},{cart_data:user.cart_data});
    res.json({success:1, message:"Cart updated successfully"});
});

app.post('/removefromcart', fetchUser,async (req, res) => {
    let user= await users.findOne({_id:req.user.id});
    user.cart_data[req.body.Itemid]-=1;
    await users.findOneAndUpdate({_id:req.user.id},{cart_data:user.cart_data});
    res.json({success:1, message:"Cart updated successfully"});
});


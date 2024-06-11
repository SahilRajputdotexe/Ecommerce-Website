const port=4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { hash } = require('crypto');


app.use(express.json());
app.use(cors());

async function hashPassword(password){
    return  bcrypt.hashSync(password,10);
}

mongoose.connect('mongodb+srv://Ecomdemo:QWERTYUIOP@cluster0.fhfp17a.mongodb.net/Ecom');

const storage = multer.diskStorage({
    destination:"./upload/images",
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage});

//Schema Product
const product= mongoose.model('product',{
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


//API for user authentication

const users= mongoose.model('users',{
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
})


//API for product database
app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log(`Server is running on port ${port}`);
});
app.get('/', (req, res) => {
    res.send('Hello World')
});

app.use('/images', express.static('upload/images'));
app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`,
        file:req.file});
});

app.post('/addproduct', async (req, res) => {
    let products = await product.find({});
    let id;
    if(products.length > 0){
        let last_product_array=products.slice(-1);
        id=last_product_array[0].id+1;
    }
    else{
        id=1;
    }
    const newProduct = new product({
        id:id,
        name:req.body.name, 
        image:req.body.image, 
        category:req.body.category, 
        old_price:req.body.old_price, 
        new_price:req.body.new_price, 
        available:req.body.available});
    await newProduct.save();
    res.json({success:1, message:"Product added successfully"});
});

app.get('/getproducts', async (req, res) => {
    let products = await product.find({});
    res.json({success:1, products:products});
});

app.get('/getproduct/:id', async (req, res) => {
    let products = await product.find({id:req.params.id});
    res.json({success:1, product:products});
}   );

app.put('/updateproduct/:id', async (req, res) => {
    await product.findOneAndUpdate({id:req.params.id}, req.body);
    res.json({success:1, message:"Product updated successfully"});
});

app.delete('/deleteproduct', async (req, res) => {
    await product.findOneAndDelete({id:req.body.id});
    res.json({success:1, message:"Product deleted successfully"});
}  );


app.get('/newcollections',async (req,res)=>{
    let products = await product.find({}).sort({date:-1}).limit(8);
    res.json({success:1, products:products});
});

app.get('/popular/:category/:n',async (req,res)=>{
    let products = await product.find({category:req.params.category}).sort({date:-1}).limit(req.params.n);
    res.json({success:1, products:products});
});



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

    const data={
        user:{
            id:newUser.id,
            email:newUser.email,
            name:newUser.name
        }
    }

    const token=jwt.sign(data,'secret_ecom');
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


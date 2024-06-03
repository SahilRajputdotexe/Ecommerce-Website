const port=4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');


app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://Ecomdemo:QWERTYUIOP@cluster0.fhfp17a.mongodb.net/Ecom');

const storage = multer.diskStorage({
    destination:"./upload/images",
    filename:(req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage});

//Schema
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


//API
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
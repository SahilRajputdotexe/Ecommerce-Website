const express=require("express")
const router= express.Router()
const product=require('../Models/product')

router.post('/addproduct', async (req, res) => {
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

router.get('/getproducts', async (req, res) => {
    let products = await product.find({});
    res.json({success:1, products:products});
});

router.get('/getproduct/:id', async (req, res) => {
    let products = await product.find({id:req.params.id});
    res.json({success:1, product:products});
}   );

router.put('/updateproduct/:id', async (req, res) => {
    await product.findOneAndUpdate({id:req.params.id}, req.body);
    res.json({success:1, message:"Product updated successfully"});
});

router.delete('/deleteproduct', async (req, res) => {
    await product.findOneAndDelete({id:req.body.id});
    res.json({success:1, message:"Product deleted successfully"});
}  );


router.get('/newcollections',async (req,res)=>{
    let products = await product.find({}).sort({date:-1}).limit(8);
    res.json({success:1, products:products});
});

router.get('/popular/:category/:n',async (req,res)=>{
    let products = await product.find({category:req.params.category}).sort({date:-1}).limit(req.params.n);
    res.json({success:1, products:products});
});



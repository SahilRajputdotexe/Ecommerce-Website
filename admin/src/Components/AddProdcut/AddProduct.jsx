import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

  const[image,setImage] = useState(false);
  const[productDetails,setProductDetails] = useState({name:'',old_price:'',new_price:'',category:'women',image:''}) ;

  const imageHandler = (e) => { setImage(e.target.files[0]) };
  const changeHandler = (e) => { setProductDetails({...productDetails,[e.target.name]:e.target.value}) };
  const addproduct = async() => {
    
    let responseData;
    let product =productDetails;
    let formData = new FormData();
    formData.append('image',image);

    await fetch('http://localhost:4000/upload',{
      method:'POST',
      body:formData,
      headers:{
        
      }
    }).then((resp)=>resp.json()).then((data)=>{responseData = data;}).catch((err)=>{console.log(err)})

    if(responseData.success){
      product.image=responseData.image_url;

      await fetch('http://localhost:4000/addproduct',{
        method:'POST',
       
        headers:{
          Accept:"application/json",
          'Content-Type':'application/json'
        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>data.success?alert("Product Added"):alert("Failed")).catch((err)=>{console.log(err)});
    }

  }
  
  return (
    <div className='add-product'>
      <div className="addproduct-item-field">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-item-field">
            <p>Price</p>
            <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
        </div>
        <div className="addproduct-item-field">
            <p>Offer-Price</p>
            <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-item-field">
        <p>Product Category</p>
        <select  value={productDetails.category} onChange={changeHandler} name="category" id="category" className='addproduct-selector'>
            <option value='men'>Men</option>
            <option value='women'>Women</option>
            <option value='kids'>Kids</option>
        </select>
      </div>
      <div className="addproduct-item-field">
        <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-image' alt="" />

        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
      </div>
        <button onClick={()=>addproduct()}className='addproduct-btn'>Add Product</button>
    </div>
  )
}

export default AddProduct

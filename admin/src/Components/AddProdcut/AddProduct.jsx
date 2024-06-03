import React from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
  return (
    <div className='add-product'>
      <div className="addproduct-item-filed">
        <p>Product Title</p>
        <input type="text" name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-item-filed">
            <p>Price</p>
            <input type="text" name='old_price' placeholder='Type here' />
        </div>
        <div className="addproduct-item-filed">
            <p>Offer-Price</p>
            <input type="text" name='new_price' placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-item-filed">
        <p>Product Category</p>
        <select name="category" id="category" className='addproduct-selector'>
            <option value='men'>Men</option>
            <option value='women'>Women</option>
            <option value='kids'>Kids</option>
        </select>
      </div>
      <div className="addproduct-item-filed">
        <label htmlFor="file-input">
            <img src={upload_area} className='addproduct-thumbnail-image' alt="" />

        </label>
        <input type="file" name='image' id='file-input' hidden/>
      </div>
        <button className='addproduct-btn'>Add Product</button>
    </div>
  )
}

export default AddProduct

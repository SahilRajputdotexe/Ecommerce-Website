import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const {all_product,cartItems,removeFromCart,getTotalCartAmount}= useContext(ShopContext);
  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((product)=>{
        if(cartItems[product.id]>0){
            return <div>
                <div className="cartitems-format cartitems-format-main">
                    <img src={product.image} alt="" className='carticon-product-icon'/>
                    <p>{product.name}</p>
                    <p>₹{product.new_price*83.06}</p>
                    <button className='cartitems-quantity'>{cartItems[product.id]}</button>
                    <p>₹{product.new_price*cartItems[product.id]*83.06}</p>
                    <img src={remove_icon} className='carticon-remove-icon' alt=""  onClick={()=>{removeFromCart(product.id)}}/>
                </div>
                <hr />
        
            </div>
                
        }
        return null;
        
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
                <div className="cartitems-total-items">
                    <p>Subtotal</p>
                    <p>₹{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-items">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-items">
                    <h3>Total</h3>
                    <h3>₹{getTotalCartAmount()}</h3>
                </div>
            </div>
            <button>Proceed To Checkout</button>
        </div>
        <div className="cartitems-promocode">
            <p>Enter Coupon Code</p>
            <div className="cartitems-promobox">
                <input type="text" placeholder='PromoCode'/>
                <button>Submit</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems

import React, { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getdefaultcart=()=>{
    let cart ={};
    for(let i=0;i<all_product.length;i++){
        cart[all_product[i].id]=0;
    }
    return cart;
}


const ShopContextProvider = (props) => {


    const [cartItems, setCartItems] = useState(getdefaultcart());

    
    
    const addToCart = (id) => {
        setCartItems((prev)=>({...prev,[id]:prev[id]+1}))
    }
    
    const removeFromCart = (id) => {
        setCartItems((prev)=>({...prev,[id]:prev[id]-1}))
    }

    const getTotalCartAmount = () => {
        let totalAmount=0;
        for(const item in cartItems){
            if (cartItems[item]>0){
                let iteminfo=all_product.find((e)=>e.id===Number(item));
                console.log(iteminfo)
                totalAmount+=iteminfo.new_price*cartItems[item];
            }
            
        }
        return totalAmount*83.06;
    }

    const getTotalCartItems = () => {   
        let totalItems=0;
        for(const item in cartItems){
           if (cartItems[item]>0){
               totalItems+=cartItems[item];
           }
        }
        return totalItems;
    }

    const contextvalue = {all_product,cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems};

    return (
        <ShopContext.Provider value={contextvalue}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;
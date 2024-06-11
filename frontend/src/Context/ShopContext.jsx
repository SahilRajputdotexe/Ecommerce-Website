import React, { createContext, useEffect, useState } from "react";


export const ShopContext = createContext(null);

const getdefaultcart=()=>{
    let cart ={};
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    return cart;
}


const ShopContextProvider = (props) => {


    const[all_product,setAllProduct]=useState([]);
    const [cartItems, setCartItems] = useState(getdefaultcart());

    useEffect(() => {
        fetch('http://localhost:4000/getproducts').then((resp)=>resp.json()).then((data)=>setAllProduct(data.products)).catch((err)=>{console.log(err)});
        if(sessionStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcartdata',{
                method:'GET',
                headers:{
                    Accept:"application/form-data",
                    "Content-Type":"application/json",
                    "auth-token":`${sessionStorage.getItem('auth-token')}`
                }
            }).then((resp)=>resp.json()).then((data)=>{setCartItems(data.cart_data)}).catch((err)=>{console.log(err)})
        }
    },[]);
    
    const addToCart = (id) => {
        setCartItems((prev)=>({...prev,[id]:prev[id]+1}))
        if (sessionStorage.getItem('auth-token')){    
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:"application/form-data",
                    "Content-Type":"application/json",
                    "auth-token":`${sessionStorage.getItem('auth-token')}`
                },
                body:JSON.stringify({"Itemid":id})
            }).then((resp)=>resp.json()).then((data)=>console.log(data)).catch((err)=>{console.log(err)});
        }
    }
    
    const removeFromCart = (id) => {
        setCartItems((prev)=>({...prev,[id]:prev[id]-1}))
        if (sessionStorage.getItem('auth-token')){    
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:"application/form-data",
                    "Content-Type":"application/json",
                    "auth-token":`${sessionStorage.getItem('auth-token')}`
                },
                body:JSON.stringify({"Itemid":id})
            }).then((resp)=>resp.json()).then((data)=>console.log(data)).catch((err)=>{console.log(err)});
        }
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
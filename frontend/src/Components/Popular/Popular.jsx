import React, { useEffect, useState } from 'react'
import './Popular.css'

import Item from '../Item/Item'


const Popular = () => {

  const [data_product, setDataProduct] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/popular/women/4').then((resp)=>resp.json()).then((data)=>setDataProduct(data.products)).catch((err)=>{console.log(err)});
  },[]);

  return (
    <div className='popular'>
        <h1>Popular in women</h1>
        <hr />
        <div className="popular-item">
            {data_product.map((item,i) => {return <Item key={i} id ={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price} />})}
        </div>
    </div>
  )
}
export default Popular

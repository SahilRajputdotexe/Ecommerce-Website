import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Get Exclusive offers and deals</h1>
      <p>Subscribe to the NEWSLETTER</p>
      <div>
        <input type="email" placeholder="Enter your email" />
        <button>Subsribe</button>
      </div>
    </div>
  )
}

export default NewsLetter

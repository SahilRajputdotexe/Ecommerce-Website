import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
import nav_profile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} className='nav-logo' alt="" />
      <img src={nav_profile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar

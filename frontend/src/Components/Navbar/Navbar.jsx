import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/dropdown_icon.png'

const Navbar = () => {

    const[menu,setMenu] = useState("home");
    const{getTotalCartItems}=useContext(ShopContext);
    const menuref=useRef();

    const dropdown_toggle=(e)=>{
        menuref.current.classList.toggle('nav-menu-active');
        e.target.classList.toggle('open');
    }

  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt='logo' />
            <p>Demo-Shop</p>
        </div>
            <img className='nav-dropdown' onClick={dropdown_toggle}src={nav_dropdown} alt="" />
            <ul ref={menuref} className='nav-menu'>
                <li onClick={()=>{setMenu("home")}}><Link style ={{textDecoration: 'none'}}to='/'>Home</Link>{menu==='home'?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("mens")}}><Link style ={{textDecoration: 'none'}}to ='/mens'>Mens</Link>{menu==='mens'?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("womens")}}><Link style ={{textDecoration: 'none'}}to = '/womens'>Womens</Link>{menu==='womens'?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("kids")}}><Link style ={{textDecoration: 'none'}}to = '/kids'>Kids </Link>{menu==='kids'?<hr/>:<></>}</li>
            </ul>
        <div className='nav-login-cart'>

            {localStorage.getItem('auth-token')
            ?<Link style ={{textDecoration: 'none'}}onClick={()=>{
                localStorage.removeItem('auth-token');
                window.location.replace('/');
            }}><button>Logout</button></Link>
            :<Link style ={{textDecoration: 'none'}}to ='/login'><button>Login</button></Link>
            }

            
            <Link style ={{textDecoration: 'none'}}to ='/cart'><img src={cart_icon} alt='cart' /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>         
    </div>
  )
}

export default Navbar

import React, { useState } from 'react'
import './CSS/Login.css'

const Login = () => {

  const [state, setState] = useState('Login');
  const [formData, setFormData] = useState({name:'',email:'',password:''})


  const login =async() => {
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    }).then((resp)=>resp.json()).then((data)=>{responseData=data}).catch((err)=>{console.log(err)})

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }
    else{
      alert(responseData.message)
    }
  }

  const signup =async() => {
    let responseData;
    await fetch('http://localhost:4000/register',{
      method:'POST',
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    }).then((resp)=>resp.json()).then((data)=>{responseData=data}).catch((err)=>{console.log(err)})

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
      alert('User Created');
    }
    else{
      alert(responseData.message)
    }
  }

  const changeHandler=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1 >
          {state} 
        </h1>
        <div className="loginsignup-fields">
          {state==='Sign Up'?<input type="text" name='name' value={formData.name} onChange={changeHandler}placeholder='YourName' />:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={ formData.password} onChange={changeHandler} type="password" placeholder='Password' />
          
        </div>
          <button onClick={()=>{state==="Login"?login():signup()}}>{state}</button>
          {state==='Sign Up'?<p className="loginsignup-login">Already have an account?<span on onClick={()=>{setState('Login')}}>Login here</span></p>
          :<p className="loginsignup-login">First Time here?<span onClick={()=>{setState('Sign Up')}}>Create Account</span></p>}
          
          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>By continuing, i agree to the terms of use & privacy policy</p>
          </div>
      </div>
    </div>
  )
}

export default Login

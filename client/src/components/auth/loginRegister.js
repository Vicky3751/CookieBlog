import React, { useEffect, useState } from 'react'
import {NavLink, Link} from "react-router-dom"
import $ from 'jquery';
import { loginUser, otpSend, updatePassword , registerUser} from '../../services/api';

const LoginRegister = () => {
    const [login, setLogin] = useState();
    const [reset, setReset] = useState();
    const [register, setregister] = useState();
    const user_info = JSON.parse(localStorage.getItem("user_info"))

  useEffect(() => {


  }, [])
  
    function LoginForm(e) {
        setLogin({
          ...login,
          [e.target.name]: e.target.value,
        });
        // console.log(login)
      }

      const LoginFormSubmit = (e) => {
        loginUser(login).then((response)=>{
            if(response.data == "IE"){
                $("#login-invalid-email").removeClass("invisible")
                $("#login-invalid-password").addClass("invisible")

            }
            else if(response.data == "IP"){
                $("#login-invalid-email").addClass("invisible")
                $("#login-invalid-password").removeClass("invisible")
            }else{
                console.log(response, response.data)
                $("#login-invalid-email").addClass("invisible")
                $("#login-invalid-password").addClass("invisible")

                localStorage.setItem( 'user_info',JSON.stringify(response.data))
                window.location.href = window.location.href + "global" 
            }
        })
      }


      const resetPassword =(e) =>{
        setReset({
            ...reset,
            [e.target.name]: e.target.value,
          });
      }

      const registerForm = (e) =>{
          setregister({
              ...register,
              [e.target.name]: e.target.value
          })
      }
      const registerFormSubmit =async ()=>{
        // console.log(register)
        registerUser(register).then((response)=>{
            localStorage.setItem( 'user_info',JSON.stringify(response.data))
            window.location.href = window.location.href + "global" 
        })
      }

      const getOTP = () => {
        console.log(reset.email)
        otpSend(reset.email).then((response)=>{
            // console.log(response.data)
        })
      }
      const resetPasswordSubmit = () =>{
          updatePassword(reset).then((response)=>{
            window.location.href = window.location.href  

        })
      }



    const forgotpass = () =>{
        $("#cookie-blog-login-section-2").removeClass("invisible")
        $("#cookie-blog-login-section-1").addClass("invisible")
    }
    const registerNow = ()=>{
        $("#cookie-blog-register-section-2").removeClass("invisible")
        $("#cookie-blog-register-section-1").addClass("invisible")
    }

  return (
    <>
        <div className='row'>

            {/* heading  */}

            <div className='cookie-blog-login-color-background'></div>
            <div className='col-md-12 col-sm-12 row cookie-blog-login-heading justify-content-center align-items-center'>
                <span className='col-md-6 col-sm-10 cookie-blog-login-heading-1'>Welcome To</span>
                <span className='col-md-6 col-sm-12 cookie-blog-login-heading-2'>Cookie Blog</span>
            </div>

            {/* body  */}

            <div className='col-md-12 col-sm-12 row justify-content-center align-items-center '>

                {/* login first section  */}
                <div className='col-md-6 col-sm-12 row cookie-blog-login-section justify-content-center align-items-center ' id="cookie-blog-login-section-1">
                    <div className='col-md-12 text-center cookie-blog-login-section-heading'>
                        LOGIN
                    </div>
                    <div className='col-md-12 row mt-4 justify-content-center align-items-center'>
                        <input type='text' onChange={(e)=>LoginForm(e)} placeholder='Email ...' name='email' className='input-style-primary col-md-6'/>
                    </div>
                    <span className='col-md-6 Invalid-primary invisible' id="login-invalid-email">Invalid Email</span>
                    <div className='col-md-12 row mt-4 justify-content-center align-items-center'>
                        <input type='password'  onChange={(e)=>LoginForm(e)} placeholder='Password ...' name='password' className='input-style-primary col-md-6'/>
                    </div>
                    <span className='col-md-6 Invalid-primary invisible' id="login-invalid-password">Invalid Password</span>

                    <div className='col-md-12 row mt-4 justify-content-center align-items-center text-center'>
                           <button className='btn  forgot-your-password col-md-6'onClick={()=>forgotpass()} > Forgot your password ?</button>
                    </div>

                    <div className='col-md-12 row mt-4 justify-content-center align-items-center text-center'>
                           <button className='btn btn-primary login-btn col-md-2' onClick={()=>LoginFormSubmit()}>LOGIN</button>
                    </div>
                    
                </div>


                {/* login second section  */}

                <div className='col-md-6 col-sm-12 row cookie-blog-login-section justify-content-center align-items-center invisible' id="cookie-blog-login-section-2">
                    <div className='col-md-12 text-center cookie-blog-login-section-heading'>
                        LOGIN
                    </div>
                    <div className='col-md-12 row mt-4 justify-content-center align-items-center'>
                        <input name='email' onChange={(e) => resetPassword(e)} type='text' placeholder='Email ...' className='input-style-primary col-md-4'/>
                        <button className='btn btn-primary otp-btn col-md-2' onClick={()=>getOTP()}>Get Otp</button>

                    </div>
                    <div className='col-md-12 row mt-4 justify-content-center align-items-center'>
                        <input type='text' name="otp" onChange={(e) => resetPassword(e)} placeholder='Enter OTP ...' className='input-style-primary col-md-6'/>
                    </div>
                    <div className='col-md-12 row mt-4 justify-content-center align-items-center'>
                        <input type='text' name="password" onChange={(e) => resetPassword(e)} placeholder='Enter new password ...' className='input-style-primary col-md-6'/>
                    </div>
                    <div className='col-md-12 row mt-4 justify-content-center align-items-center'>
                        <input type='password' name="repassword" onChange={(e) => resetPassword(e)} placeholder='Confirm new password ...' className='input-style-primary col-md-6'/>
                    </div>
                    <div className='col-md-12 row mt-4 justify-content-center align-items-center text-center'>
                           <button className='btn btn-primary login-btn col-md-2' onClick={()=>resetPasswordSubmit()}>LOGIN</button>
                    </div>
                </div>



                {/* Register first section  */}

                <div className='col-md-6 col-sm-12 row cookie-blog-register-section justify-content-center align-items-center ' id="cookie-blog-register-section-1">
                    <div className='col-md-12 text-center cookie-blog-register-section-heading'>
                        New Here ?
                    </div>
                    <div className='col-md-12 text-center cookie-blog-register-section-title justify-content-center align-items-center row mt-5 pt-4'>
                        <span className='col-md-10 text-center'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </span>
                    </div>
                    <div className='col-md-12 row mt-4 justify-content-center align-items-center text-center pt-5 '>
                           <button className='btn btn-secondary login-btn col-md-3' onClick={()=> registerNow()}>Register Now</button>
                    </div>
                </div>




                {/* Register second section  */}

                <div className='col-md-6 col-sm-12 row cookie-blog-register-section justify-content-center align-items-center invisible' id="cookie-blog-register-section-2">
                    <div className='col-md-12 text-center cookie-blog-register-section-heading'>
                        REGISTER
                    </div>
                    <div className='col-md-12 row mt-4 justify-content-center align-items-center'>
                        <input type='text' name='name' onChange={(e)=>registerForm(e)} placeholder='Confirm Username ...' className='input-style-secondary col-md-6'/>
                    </div>
                    <div className='col-md-12 row mt-4 justify-content-center align-items-center'>
                        <input type='text' name='email' onChange={(e)=>registerForm(e)} placeholder='Enter Email ...' className='input-style-secondary col-md-6'/>

                    </div>
                    <div className='col-md-12 row mt-4 justify-content-center align-items-center'>
                        <input type='number' name='phone' onChange={(e)=>registerForm(e)} placeholder='Enter phone no ...' className='input-style-secondary col-md-6'/>
                    </div>
                    <div className='col-md-12 row mt-4 justify-content-center align-items-center'>
                        <input type='text' name='password' onChange={(e)=>registerForm(e)} placeholder='Enter new password ...' className='input-style-secondary col-md-6'/>
                    </div>
                    
                    <div className='col-md-12 row mt-4 justify-content-center align-items-center text-center'>
                           <button  onClick={()=>registerFormSubmit()} className='btn btn-secondary login-btn col-md-2'>LOGIN</button>
                    </div>
                </div>
                
            </div>
        </div>
    </>
  )
}

export default LoginRegister
import React, {useEffect, useState} from "react";
import "./loginform.css"
import { Navigate, useNavigate } from "react-router-dom";

const LoginForm = () => {

const navigate = useNavigate();
const[userDetails,setUserDetails]= useState({
        username:'',
        password:''
    })
const handleChange=(event,field)=>
{
   let actualValue=event.target.value;
   setUserDetails({
    ...userDetails,
    [field]:actualValue
   })
}

    const onSuccess = (event) => {
       console.log(userDetails);

       if(userDetails.username=='' || userDetails.password=='')
       {
        alert("Username or Password is Required!!")
       }
       if(userDetails.username=='admin'&&userDetails.password=='adminpassword')
       {
        navigate('/home');
       }
       else if(userDetails.username=='bob'&&userDetails.password=='bobspassword')
       {
        navigate('/home');
       }
       else
       {
        alert("Username or Password is Invalid!!");
       }

        
    }

    return (
        <div className="parent-container">
          <div className="image-container">
            <img src="quiz.jpeg"/>
          </div>
          <div className="login-form-container">
            <div className="cover">
              <h1>Login</h1>
              <input type="text" placeholder="username" value={userDetails.username} onChange={(e) =>handleChange(e,'username')}/>
              <input type="password" placeholder="password" value={userDetails.password} onChange={(e) =>handleChange(e,'password') }/>
              <div className="login-btn" onClick={onSuccess}>Login</div>
            </div>
          </div>
        </div>
      );
      
}

export default LoginForm
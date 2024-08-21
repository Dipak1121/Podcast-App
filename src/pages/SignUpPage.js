import React, { useState } from "react";

import SignUpForm from "../components/signupPageComponents/signupForm/SignUpForm";
import LoginForm from "../components/signupPageComponents/loginForm/LoginForm";
import Header from "../components/commonComponents/header/Header";

const SignUp = () => {
  
    const [flag, setFlag] =useState(false);


  return (
    <div className="wrapper-input">
      <Header />
      {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
      {!flag ? <SignUpForm /> : <LoginForm />}
      {!flag ? 
      <p onClick={()=> setFlag(!flag)}>Already Have An Account? Login</p> : 
      <p onClick={()=> setFlag(!flag)}>Do not have an account? SignUp</p>}
    </div>
  );
};

export default SignUp;

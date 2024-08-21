import React from 'react'
import Input from '../../commonComponents/input/Input'
import Button from '../../commonComponents/button/Button'
import Header from '../../commonComponents/header/Header'
import { auth, db,  storage} from '../../../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'

import { useDispatch } from 'react-redux'
import { setUser } from '../../../slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const SignUpForm = () => {

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async ()=>{
    console.log("Handle Signup");
    setLoading(true);
    if(password == confirmPassword && password.length >= 6){
      try{
        // creating user's account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        console.log("usercredential", userCredential);
        const user = userCredential.user;
        console.log("User", user);

        await setDoc(doc(db, "users", user.uid), {
          name: fullname,
          email: user.email,
          uid: user.uid
        });

        dispatch(setUser({
          name: fullname,
          email: user.email,
          uid: user.uid
        }));
        toast.success("You have successfully Signed Up");
        setLoading(false);
        navigate("/profile");
      }
      catch(err){
        console.log(err);
        toast.error(err.message)
      }
    }
    else{
      if(password != confirmPassword){
        toast.error("Please make sure your password and confirm password are same")
      }
      else{
        toast.error("Password should contain atleast 6 characters")
      }

      setLoading(false);
    }
    
  }

  return (
    <>   
        <Input
          state={fullname}
          setState={setFullname}
          type="text"
          placeholder="Full Name"
          required={true}
        />
        <Input
          state={email}
          setState={setEmail}
          type="email"
          placeholder="Email"
          required={true}
        />
        <Input
          state={password}
          setState={setPassword}
          type="password"
          placeholder="Password"
          required={true}
        />
        <Input
          state={confirmPassword}
          setState={setConfirmPassword}
          type="password"
          placeholder="Confirm Password"
          required={true}
        />
        <Button text={loading ? "Loading" : "Signup Now"} 
        disable={loading}
        onClick={handleSignUp}/>
    </>
  )
}

export default SignUpForm

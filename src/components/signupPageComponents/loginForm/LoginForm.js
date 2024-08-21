import React, {useState} from 'react'
import Input from '../../commonComponents/input/Input';
import Button from '../../commonComponents/button/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { setUser } from '../../../slices/userSlice';
import { toast } from 'react-toastify';

const LoginForm = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async ()=>{
    console.log("Handle Login");
    
      try{
        // creating user's account
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )

        const user = userCredential.user;
        console.log("User", user);

        const userDoc = await getDoc(doc(db, "users", user.uid));
        console.log(userDoc);
        const userData = userDoc.data();
        console.log(userData);

        dispatch(setUser({
          name: userData.name,
          email: userData.email,
          uid: userData.uid
        }));

        console.log("User logged in Successfully....")
        toast.success("Logged in successfully")
        navigate("/profile");
      }
      catch(err){
        console.log(err);
        toast.error("Email or Password are incorrect");
      }
    
  }
  return (
    <>   
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
        
        <Button text="Login" onClick={handleLogin}/>
    </>
  )
}

export default LoginForm

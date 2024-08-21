import { Outlet, Navigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import React from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { setUser } from "../../slices/userSlice";
import { toast } from "react-toastify";
import Loader from "./loader/Loader";

const PrivateRoutes = () => {
    const dispatch = useDispatch();
    const [user, loading, error] = useAuthState(auth);

    if(user){
        // console.log(user.uid);
        getDoc(doc(db, "users", user.uid))
        .then(userDoc=> userDoc.data())
        .then(userData => {
            dispatch(setUser({
                name: userData.name,
                email: userData.email,
                uid: userData.uid
            }))
        })
        .catch(err => console.log(err))
    }
    
    


    if(loading){
        return <Loader />
    }
    else if(!user){
        toast.warning("Please Login or SignUp");
        return <Navigate to="/" replace />
    }
    else if(error){
        return <Navigate to="/" replace />
    }
    else{
        return <Outlet />
    }
}

export default PrivateRoutes

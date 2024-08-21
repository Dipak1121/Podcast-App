import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/commonComponents/header/Header';
import Button from '../components/commonComponents/button/Button';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const ProfilePage = () => {

    const user = useSelector(state => state.user.user);
    // console.log("My user is", user);

    const handleLogOut = ()=>{
      signOut(auth).then(() => {
        // Sign-out successful.
        toast.info("Logged Out Successfully");
      }).catch((error) => {
        // An error happened.
      });
    }

    if(!user){
      return <p>Loading...</p>
    }
  return (
    <div style={{width:"100vw"}}>
      <Header />
      <div style={{width:"90%", display:"flex", justifyContent:"end", margin:"auto"}}>
          <Button text="LogOut" onClick={handleLogOut} width={"300px"}/>
      </div>
      <div className='user-info'>
          <h4 style={{fontSize:"22px"}}><span style={{fontWeight:"400", opacity:"0.5"}}>Name: </span>{user.name}</h4>
          <h4 style={{fontSize:"22px"}}><span style={{fontWeight:"400", opacity:"0.5"}}>Email: </span>{user.email}</h4>
      </div>
    </div>
  )
}

export default ProfilePage

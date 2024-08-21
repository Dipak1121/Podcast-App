
import './App.css';
import { Router, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './components/commonComponents/PrivateRoutes';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import CreatePodcastPage from './pages/CreatePodcastPage';
import PodcastsPage from './pages/PodcastsPage';
import PodcastDetailsPage from './pages/PodcastDetailsPage';
import CreateEpisode from './pages/CreateEpisode';

function App() {

  const dispatch = useDispatch();

  // useEffect(()=>{
  //   const unSubscribeAuth = onAuthStateChanged(auth, (user)=>{
  //     if(user){
  //       const unSubscribeSnapshot = onSnapshot(
  //         doc(db, "users", user.uid),
  //         (userDoc) =>{
  //           if(userDoc.exists()){
  //             const useData = useDoc.data();

  //           }
  //         }
  //       )
  //     }
  //   })
  // })

  
  const [user, loading, error] = useAuthState(auth);
  

  return (
    <div className="App">
        <ToastContainer />
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/start-a-podcast' element={<CreatePodcastPage />} />
            <Route path='/podcasts' element={<PodcastsPage />} />
            <Route path='/podcasts/:id' element={<PodcastDetailsPage />} />
            <Route path='/podcasts/:id/create-episode' element={<CreateEpisode />} />
          </Route>
          
        </Routes>
      
    </div>
  );
}

export default App;

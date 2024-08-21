import React, { useState } from "react";
import Header from "../components/commonComponents/header/Header";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/commonComponents/input/Input";
import FileInput from "../components/commonComponents/input/FileInput";
import Button from "../components/commonComponents/button/Button";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db } from "../firebase";
import { storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const CreateEpisode = () => {
    const {id} = useParams();
    console.log(id)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audio, setAudio] = useState("");

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const audioFileHandle = (file)=>{
    setAudio(file);
  }

  const handleSubmit = async ()=>{
    setLoading(true);
    if(audio, title, description){
        try{
            const audioRef = ref(
                storage,
                `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
            )

            await uploadBytes(audioRef, audio);

            const audioURL = await getDownloadURL(audioRef);

            const episodeData = {
                title: title,
                description: description,
                audio: audioURL
            }

            // await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);
            await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);


            toast.success("Episode created successfully");
            setLoading(true);
            navigate(`/podcasts/${id}`);
            setTitle("");
            setDescription("");
            setAudio(null);
        }
        catch(err){
            toast.error(err.message)
            console.log(err)
            setLoading(false);
        }
    }
    else{
        toast.error("Please fill all fields")
        setLoading(false);
    }
  }

  return (
    <div>
      <Header />
      <div className="wrapper-input">
        <h1>Create Episode</h1>
        <Input
          type={"text"}
          state={title}
          setState={setTitle}
          placeholder={"Title"}
          required={true}
        />
        <Input
          type={"text"}
          state={description}
          setState={setDescription}
          placeholder={"Description"}
          required={true}
        />
        <FileInput 
            accept={"audio/*"}
            id={"audio-file-input"}
            fileHandleFun={audioFileHandle}
            text={"Upload Audio"}
        />
        <Button
            text={loading ? "Loading..." : "Create Episode"}
            disable={loading}
            onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateEpisode;

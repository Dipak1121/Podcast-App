import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../commonComponents/input/Input";
import Button from "../commonComponents/button/Button";
import FileInput from "../commonComponents/input/FileInput";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const CreatePodcastForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    if (title && desc && displayImage && bannerImage) {
      // upload files -> get downlodable link
      try{
      const bannerImageRef = ref(
        storage,
        `podcast/${auth.currentUser.uid}/${Date.now()}`
      );
      const uploadedBanner = await uploadBytes(bannerImageRef, bannerImage);
      console.log("Uploaded", uploadedBanner);
      const bannerImageUrl = await getDownloadURL(bannerImageRef);
      console.log(bannerImageUrl);

      const displayImageRef = ref(
        storage,
        `podcast/${auth.currentUser.uid}/${Date.now()}`
      );
      const uploadedDisplay = await uploadBytes(displayImageRef, displayImage);
      console.log("Uploaded", uploadedDisplay);
      const displayImageUrl = await getDownloadURL(displayImageRef);
      console.log(displayImageUrl);

      const podcastData = {
        title: title,
        description: desc,
        bannerImage: bannerImageUrl,
        displayImage: displayImageUrl,
        createdBy: auth.currentUser.uid
    }

      await addDoc(collection(db, "podcasts"), podcastData);

      setTitle("");
      setDesc("");
      setDisplayImage();
      setBannerImage();
      setLoading(false);

      toast.success("Podcast Created");
      console.log("Podcast Created");
    }
    catch(err){
        console.log(err);
        setLoading(false);
        toast.error("Error Occured while uploading images");
    }

    } else {
        setLoading(false);
      toast.error("Please fill all fields");
    }
  };

  const bannerImageHandle = (file) => {
    setBannerImage(file);
  };

  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };

  return (
    <>
      <Input
        state={title}
        setState={setTitle}
        type="text"
        placeholder="Title"
        required={true}
      />

      <Input
        state={desc}
        setState={setDesc}
        type="text"
        placeholder="Description"
        required={true}
      />

      <FileInput
        accept="image/*"
        id="banner-image"
        fileHandleFun={bannerImageHandle}
        text="Add Banner Image"
      />
      <FileInput
        accept="image/*"
        id="disp-image"
        fileHandleFun={displayImageHandle}
        text="Add Display Image"
      />

      <Button text={loading ? "Loading..." : "Create Podcast"} onClick={handleSubmit} />
    </>
  );
};

export default CreatePodcastForm;

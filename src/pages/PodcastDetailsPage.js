import React, { useEffect, useState } from "react";
import Header from "../components/commonComponents/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { toast } from "react-toastify";
import Button from "../components/commonComponents/button/Button";
import { auth } from "../firebase";
import EpisodesDetails from "../components/podcasts/EpisodesDetails";
import AudioPlayer from "../components/podcasts/AudioPlayer";

const PodcastDetailsPage = () => {
  const { id } = useParams();
  // console.log("ID", id);

  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [playingFile, setPlayingFile] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document Data: ", docSnap.data());
        setPodcast({ id: id, ...docSnap.data() });
      } else {
        console.log("No Such Document");
        navigate("/podcasts");
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to get podcast details");
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodeData = [];
        querySnapshot.forEach((doc) => {
          episodeData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodeData);
      },
      (error) => {
        console.error("Error while fetching episodes: ", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [id]);

  return (
    <div>
      <Header />
      {podcast.id && (
        <div className="wrapper-input-1">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h1 className="podcast-title">{podcast.title}</h1>
            {podcast.createdBy === auth.currentUser.uid && (
              <Button
                text="Create An Episode"
                onClick={() => navigate(`/podcasts/${id}/create-episode`)}
                width="500px"
              />
            )}
          </div>

          <div className="banner-wrapper" style={{ marginTop: "20px" }}>
            <img src={podcast.bannerImage} />
          </div>
          <p className="podcast-description">{podcast.description}</p>
          <h1 className="podcast-title">Episodes</h1>
          {episodes.length > 0 ? (
            <ol style={{width: "100%"}}>
              {episodes.map((episode) => {
                return (
                  <EpisodesDetails
                    key={episode.id}
                    title={episode.title}
                    description={episode.description}
                    audio={episode.audio}
                    onClick={(file) => setPlayingFile(file)}
                  />
                );
              })}
            </ol>
          ) : (
            <p>No Episodes Created</p>
          )}
        </div>
      )}

      {
        playingFile && 
        <AudioPlayer audioSrc={playingFile} image={podcast.displayImage} />
      }
    </div>
  );
};

export default PodcastDetailsPage;

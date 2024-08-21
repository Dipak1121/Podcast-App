import React, { useEffect } from "react";
import Header from "../components/commonComponents/header/Header";
import {
  collection,
  onSnapshot,
  query,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setPodcasts } from "../slices/podcastSlice";
import PodcastCard from "../components/podcasts/PodcastCard";
import Input from "../components/commonComponents/input/Input";
import { useState } from "react";
const PodcastsPage = () => {
  
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcast.podcast);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastData = [];
        querySnapshot.forEach((doc) => {
          podcastData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastData));
      },
      (error) => {
        console.error("Error while fetching podcast", error);
      }
    );

    return () => {
      unSubscribe();
    };
  }, [dispatch]);

  // console.log(podcasts);

  var filteredPodcast = podcasts.filter((item) =>
    item.title.trim().toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="wrapper-input" style={{ marginTop: "10px" }}>
        <h1>Discover Podcast</h1>
        <Input
          type="text"
          state={search}
          setState={setSearch}
          placeholder="Search for podcast"
          required={false}
        />
        {filteredPodcast.length > 0 ? (
          <div className="all-podcasts" style={{ marginTop: "10px" }}>
            {filteredPodcast.map((item) => {
              return (
                <PodcastCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  displayImage={item.displayImage}
                />
              );
            })}
          </div>
        ) : (
          <p>{search ? "No Podcast Found" : "No Podcasts"}</p>
        )}
      </div>
    </div>
  );
};

export default PodcastsPage;

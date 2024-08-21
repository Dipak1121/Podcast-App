import React, { useEffect, useRef, useState } from "react";
import "./audioPlayer.css";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeDown,
  FaVolumeMute,
} from "react-icons/fa";
const AudioPlayer = ({ audioSrc, image }) => {
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(10);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVolumeMute, setIsVolumeMute] = useState(false);

  const handleDuration = (e) => {
    // setDuration(e.target.value);
    setCurrentTime(parseInt(e.target.value));
    audioRef.current.currentTime = e.target.value;
  };

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleVolume = () => {
    if (isVolumeMute) {
      setIsVolumeMute(false);
    } else {
      setIsVolumeMute(true);
    }
  };

  function handleVolume(e) {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
    if (e.target.value !== 0 && isVolumeMute) {
      setIsVolumeMute(false);
    }
  }

//   useEffect(() => {
//     if(audioRef){
//         setDuration(audioRef.current.duration);
//     }
    
//   }, [audioRef]);

    useEffect(()=>{
        const audio = audioRef.current;
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetaData);
        audio.addEventListener("ended", handleEnded);

        return ()=>{
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
            audio.removeEventListener("ended", handleEnded);
        }
        
    }, [])

    function handleTimeUpdate(){
        setCurrentTime(parseInt(audioRef.current.currentTime));
    }

    function handleLoadedMetaData(){
        setDuration(parseInt(audioRef.current.duration));
    }

    function handleEnded(){
        setCurrentTime(0);
        setIsPlaying(false);
    }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  // console.log(isPlaying);

  useEffect(() => {
    if (isVolumeMute) {
      audioRef.current.volume = 0;
      setVolume(0);
    } else {
      audioRef.current.volume = 1;
    }
  }, [isVolumeMute]);

  function formatTime(time){
    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time%60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }
  return (
    <div className="custom-audio-player">
      <img src={image} className="audio-player-image" />
      <audio ref={audioRef} src={audioSrc} />
      <p className="audio-btn" onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</p>
      <div className="duration-flex">
        <p>{formatTime(currentTime)}</p>
        <input
          type="range"
          onChange={handleDuration}
          className="duration-range"
          max={duration}
          value={currentTime}
          step={0.01}
        />
        <p>{formatTime(duration)}</p>
      </div>
      <p className="audio-btn" onClick={toggleVolume}>
        {isVolumeMute ? <FaVolumeMute /> : <FaVolumeUp />}
      </p>
      <input
        type="range"
        value={volume}
        onChange={handleVolume}
        className="volume-range"
        min={0}
        max={1}
        step={0.01}
      />
    </div>
  );
};

export default AudioPlayer;

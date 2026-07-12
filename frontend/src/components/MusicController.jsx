import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Heart,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://musice1.onrender.com";

const MusicController = ({
  songs,
  currentIndex,
  setCurrentIndex,
}) => {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [likedSongs, setLikedSongs] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("likedSongs")
      ) || []
    );
  });

  const currentSong = songs[currentIndex];

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }

    const storedLikes =
      JSON.parse(
        localStorage.getItem("likedSongs")
      ) || [];

    setLikedSongs(storedLikes);
  }, [currentSong]);

  if (!songs.length || !currentSong) return null;

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    const next =
      currentIndex === songs.length - 1
        ? 0
        : currentIndex + 1;

    setCurrentIndex(next);
  };

  const prevSong = () => {
    const prev =
      currentIndex === 0
        ? songs.length - 1
        : currentIndex - 1;

    setCurrentIndex(prev);
  };

  const handleVolume = (e) => {
    const value = Number(e.target.value);

    setVolume(value);

    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  const handleSeek = (e) => {
    const seekTime = Number(e.target.value);

    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const toggleLike = () => {
    let updatedLikes;

    if (likedSongs.includes(currentSong._id)) {
      updatedLikes = likedSongs.filter(
        (id) => id !== currentSong._id
      );
    } else {
      updatedLikes = [
        ...likedSongs,
        currentSong._id,
      ];
    }

    setLikedSongs(updatedLikes);

    localStorage.setItem(
      "likedSongs",
      JSON.stringify(updatedLikes)
    );
  };

  const isLiked = likedSongs.includes(
    currentSong._id
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-[#1d202a] border-t border-zinc-700 flex items-center justify-between px-6 text-white z-50">
      <audio
        ref={audioRef}
        src={`${API_URL}/uploads/songs/${currentSong.audio}`}
        onEnded={nextSong}
        onTimeUpdate={() =>
          setCurrentTime(
            audioRef.current.currentTime
          )
        }
        onLoadedMetadata={() =>
          setDuration(
            audioRef.current.duration
          )
        }
      />

      {/* LEFT */}
      <div className="flex items-center gap-3 w-[300px]">
        <img
          src={`${API_URL}/uploads/images/${currentSong.image}`}
          alt={currentSong.title}
          className="w-14 h-14 rounded-lg object-cover"
        />

        <div className="flex-1">
          <h3 className="font-semibold truncate">
            {currentSong.title}
          </h3>

          <p className="text-sm text-gray-400 truncate">
            {currentSong.artist}
          </p>
        </div>
      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center flex-1">
        <div className="flex items-center gap-5">
          <button onClick={prevSong}>
            <SkipBack size={24} />
          </button>

          <button
            onClick={handlePlayPause}
            className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause />
            ) : (
              <Play />
            )}
          </button>

          <button onClick={nextSong}>
            <SkipForward size={24} />
          </button>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs">
            {Math.floor(currentTime / 60)}:
            {String(
              Math.floor(currentTime % 60)
            ).padStart(2, "0")}
          </span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-[400px] accent-teal-500"
          />

          <span className="text-xs">
            {Math.floor(duration / 60)}:
            {String(
              Math.floor(duration % 60)
            ).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 w-[220px] justify-end">
        <button onClick={toggleLike}>
          <Heart
            size={22}
            className={
              isLiked
                ? "fill-red-500 text-red-500"
                : "text-gray-400 hover:text-red-500"
            }
          />
        </button>

        {volume === 0 ? (
          <VolumeX />
        ) : (
          <Volume2 />
        )}

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
        />
      </div>
    </div>
  );
};

export default MusicController;
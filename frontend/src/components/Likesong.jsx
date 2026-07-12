import { Heart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://musice1.onrender.com";

const LikedSongs = ({
  songs = [],
  setCurrentIndex,
}) => {
  const navigate = useNavigate();

  const likedSongIds =
    JSON.parse(
      localStorage.getItem("likedSongs")
    ) || [];

  const likedSongs = songs.filter((song) =>
    likedSongIds.includes(song._id)
  );

  const playSong = (songId) => {
    const index = songs.findIndex(
      (song) => song._id === songId
    );

    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-white p-8 pb-40">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Heart
            size={35}
            className="fill-red-500 text-red-500"
          />

          <div>
            <h1 className="text-4xl font-bold">
              Liked Songs
            </h1>

            <p className="text-gray-400 mt-1">
              {likedSongs.length} Songs
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-[#181c24] hover:bg-[#232833] px-4 py-2 rounded-xl transition"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>

      {/* Empty State */}
      {likedSongs.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[400px]">
          <Heart
            size={70}
            className="text-gray-600 mb-4"
          />

          <h2 className="text-2xl text-gray-400">
            No Liked Songs ❤️
          </h2>

          <p className="text-gray-500 mt-2">
            Like songs from the player to see them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {likedSongs.map((song) => (
            <div
              key={song._id}
              onClick={() => playSong(song._id)}
              className="bg-[#181c24] rounded-2xl overflow-hidden border border-[#232833] cursor-pointer hover:scale-105 transition-all duration-300"
            >
              <img
                src={`${API_URL}/uploads/images/${song.image}`}
                alt={song.title}
                className="w-full h-[220px] object-cover"
              />

              <div className="p-4">
                <h2 className="font-bold text-lg truncate">
                  {song.title}
                </h2>

                <p className="text-gray-400 truncate mt-1">
                  {song.artist}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <p className="text-cyan-400 text-sm">
                    {song.genre}
                  </p>

                  <Heart
                    size={18}
                    className="fill-red-500 text-red-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedSongs;
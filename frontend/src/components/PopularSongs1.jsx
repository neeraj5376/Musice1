import { Play } from "lucide-react";
import useSongs from "../hooks/useSongs";

function PopularSongs({ setCurrentSong }) {
  const songs = useSongs();

  return (
    <div className="mt-10">

      <h2 className="text-3xl font-bold text-white mb-6">
        Popular Songs
      </h2>

      <div className="grid grid-cols-3 gap-6">

        {songs.map((song) => (
          <div
            key={song._id}
            className="bg-zinc-900 rounded-3xl overflow-hidden"
          >
            <img
              src={`http://localhost:5000/uploads/images/${song.image}`}
              alt={song.title}
              className="w-full h-60 object-cover"
            />

            <div className="p-4">

              <h3 className="text-xl font-bold text-white">
                {song.title}
              </h3>

              <p className="text-gray-400">
                {song.artist}
              </p>

              <p className="text-cyan-400 text-sm">
                {song.genre}
              </p>

              <button
                onClick={() => setCurrentSong(song)}
                className="mt-4 w-full bg-teal-600 hover:bg-teal-500 py-3 rounded-xl flex items-center justify-center gap-2 text-white"
              >
                <Play size={18} />
                Play
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default PopularSongs;
import useSongs from "../hooks/useSongs";

function PopularSongs({ setCurrentIndex }) {
  const songs = useSongs();

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold text-white mb-6">
        Popular Songs
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {songs.map((song, index) => (
          <div
            key={song._id}
            onClick={() => setCurrentIndex(index)}
            className="bg-zinc-900 rounded-3xl overflow-hidden cursor-pointer"
          >
            <img
              src={`https://musice1.onrender.com/uploads/images/${song.image}`}
              className="w-full h-60 object-cover"
            />

            <div className="p-4">
              <h3 className="text-xl capitalize font-bold text-white">
                {song.title}
              </h3>

              <p className="text-gray-400">
                {song.artist}
              </p>

              <p className="text-cyan-400 text-sm">
                {song.genre}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularSongs;
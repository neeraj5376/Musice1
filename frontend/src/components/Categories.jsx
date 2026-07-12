import { useState } from "react";

const Categories = ({ songs = [], setCurrentIndex }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Pop",
    "Rock",
    "Hip Hop",
    "Rap",
    "Classical",
  ];

  const filteredSongs =
    activeCategory === "All"
      ? songs
      : songs.filter((song) => {
          const genre = song.genre
            ?.replace("-", " ")
            .toLowerCase()
            .trim();

          return genre === activeCategory.toLowerCase();
        });

  return (
    <div className="min-h-screen bg-[#0f1117] text-white p-8 pb-40">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Music Categories
        </h1>

        <p className="text-gray-400 mt-2">
          Explore songs by genre
        </p>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-4 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeCategory === category
                ? "bg-cyan-500 text-white"
                : "bg-[#181c24] text-gray-300 hover:bg-[#232833]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Songs Grid */}
      {filteredSongs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {filteredSongs.map((song) => (
            <div
              key={song._id}
              onClick={() => {
                const originalIndex = songs.findIndex(
                  (s) => s._id === song._id
                );

                setCurrentIndex(originalIndex);
              }}
              className="bg-[#181c24] rounded-2xl overflow-hidden border border-[#232833] cursor-pointer hover:border-cyan-500 transition-all duration-300"
            >
              <img
                src={`http://localhost:5000/uploads/images/${song.image}`}
                alt={song.title}
                className="w-full h-[220px] object-cover"
              />

              <div className="p-4">
                <h2 className="font-bold uppercase text-lg truncate">
                  {song.title}
                </h2>

                <p className="text-gray-400 truncate mt-1">
                  {song.artist}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-cyan-400 text-sm">
                    {song.genre}
                  </span>

                  
                </div>
              </div>
            </div>
          ))}

        </div>
      ) : (
        <div className="flex justify-center items-center h-[300px]">
          <p className="text-gray-500 text-xl">
            No Songs Found In {activeCategory}
          </p>
        </div>
      )}
    </div>
  );
};

export default Categories;
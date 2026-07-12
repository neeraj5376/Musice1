import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const HeroSlider = ({
  songs,
  setCurrentIndex,
}) => {
  const [active, setActive] = useState(0);

  const getCardClass = (index) => {
    const total = songs.length;

    let pos = (index - active + total) % total;

    if (pos > total / 2) pos -= total;

    if (pos === 0) return "w-[340px] h-[360px] z-30";
    if (pos === -1) return "w-[240px] h-[300px] -translate-x-[260px] z-20";
    if (pos === 1) return "w-[240px] h-[300px] translate-x-[260px] z-20";
    if (pos === -2) return "w-[180px] h-[240px] -translate-x-[460px] z-10 opacity-60";
    if (pos === 2) return "w-[180px] h-[240px] translate-x-[460px] z-10 opacity-60";

    return "hidden";
  };

  const handleClick = (index) => {
    if (index === active) {
      setCurrentIndex(index);
    } else {
      setActive(index);
    }
  };

  if (!songs?.length) {
    return (
      <div className="h-[400px] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative h-[420px] flex items-center justify-center bg-zinc-950">

      <button
        onClick={() =>
          setActive(active === 0 ? songs.length - 1 : active - 1)
        }
        className="absolute left-4 z-50 w-12 h-12 bg-zinc-800 rounded-full text-white flex items-center justify-center"
      >
        <ChevronLeft />
      </button>

      {songs.map((song, index) => (
        <div
          key={song._id}
          onClick={() => handleClick(index)}
          className={`absolute rounded-[30px] overflow-hidden cursor-pointer transition-all duration-700 ${getCardClass(index)}`}
        >
          <img
            src={`http://localhost:5000/uploads/images/${song.image}`}
            className="w-full h-full object-cover"
          />

          {active === index && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90" />

              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-2xl capitalize font-bold">
                  {song.title}
                </h2>

                <p className="text-gray-300">
                  {song.artist}
                </p>

                <p className="text-cyan-400 text-sm">
                  {song.genre}
                </p>
              </div>

              <button className="absolute bottom-6 right-6 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Play fill="white" />
              </button>
            </>
          )}
        </div>
      ))}

      <button
        onClick={() =>
          setActive(active === songs.length - 1 ? 0 : active + 1)
        }
        className="absolute right-4 z-50 w-12 h-12 bg-zinc-800 rounded-full text-white flex items-center justify-center"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default HeroSlider;
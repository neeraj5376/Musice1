import { useState } from "react";
import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import PopularSongs from "../components/PopularSongs";

const Home = ({
  songs,
  setCurrentIndex,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSongs = songs.filter(
    (song) =>
      song.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      song.artist
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto text-white px-8">

      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <HeroSlider
        songs={filteredSongs}
        setCurrentIndex={setCurrentIndex}
      />

      <PopularSongs
        songs={filteredSongs}
        setCurrentIndex={setCurrentIndex}
      />

    </div>
  );
};

export default Home;
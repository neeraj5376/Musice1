import { useEffect, useState } from "react";
import axios from "axios";

const useSongs = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/songs")
      .then((res) => setSongs(res.data))
      .catch((err) => console.log(err));
  }, []);

  return songs;
};

export default useSongs;
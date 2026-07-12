import {
  House,
  Grid2x2,
  UserRound,
  ListMusic,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openPlaylist, setOpenPlaylist] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Home");

  return (
    <div className="w-[260px] h-full bg-[#181c24] rounded-3xl flex flex-col justify-between p-5">

      {/* Top */}
      <div>

        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-[#ff8c32]">
            YourMusic
          </h1>

          <p className="text-xs text-gray-500 mt-1">
            Make it a Nice Day! 🎵
          </p>
        </div>

        {/* Menu */}
        <div className="space-y-2">

          <Link to="/Home"
            onClick={() => setActiveMenu("Home")}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
              activeMenu === "Home"
                ? "bg-[#2b3039] text-white"
                : "text-gray-400 hover:bg-[#232833] hover:text-white"
            }`}
          >
            <House size={18} />
            <span className="text-sm">Home</span>
          </Link>

          <Link to="/Categories"
            onClick={() => setActiveMenu("Categories")}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
              activeMenu === "Categories"
                ? "bg-[#2b3039] text-white"
                : "text-gray-400 hover:bg-[#232833] hover:text-white"
            }`}
          >
            <Grid2x2 size={18} />
            <span className="text-sm">Categories</span>
          </Link>

          <Link to="/artist"
            onClick={() => setActiveMenu("Artists")}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
              activeMenu === "Artists"
                ? "bg-[#2b3039] text-white"
                : "text-gray-400 hover:bg-[#232833] hover:text-white"
            }`}
          >
            <UserRound size={18} />
            <span className="text-sm">Artists</span>
          </Link>

        </div>

        {/* Playlists */}
        {/* <div className="mt-6">

          <div
            onClick={() => setOpenPlaylist(!openPlaylist)}
            className="flex items-center justify-between px-4 py-3 cursor-pointer text-gray-400 hover:text-white"
          >
            <div className="flex items-center gap-4">
              <ListMusic size={18} />
              <span className="text-sm">Playlists</span>
            </div>

            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                openPlaylist ? "rotate-180" : ""
              }`}
            />
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ${
              openPlaylist ? "max-h-60 mt-3" : "max-h-0"
            }`}
          >
            <div className="space-y-3 ml-4">

              <div className="flex items-center gap-3 cursor-pointer hover:bg-[#232833] p-2 rounded-xl transition">
                <img
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100"
                  alt=""
                  className="w-9 h-9 rounded-lg object-cover"
                />

                <span className="text-sm text-gray-300">
                  Vibes & Chill
                </span>
              </div>

              <div className="flex items-center gap-3 cursor-pointer hover:bg-[#232833] p-2 rounded-xl transition">
                <img
                  src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100"
                  alt=""
                  className="w-9 h-9 rounded-lg object-cover"
                />

                <span className="text-sm text-gray-300">
                  Morning Boost
                </span>
              </div>

              <div className="flex items-center gap-3 cursor-pointer hover:bg-[#232833] p-2 rounded-xl transition">
                <img
                  src="https://images.unsplash.com/photo-1501612780327-45045538702b?w=100"
                  alt=""
                  className="w-9 h-9 rounded-lg object-cover"
                />

                <span className="text-sm text-gray-300">
                  Rhythm & Energy
                </span>
              </div>

            </div>
          </div>

        </div> */}
      </div>

      {/* Bottom */}
      <div>

        <div className="border-t border-gray-700 mb-4"></div>

        <Link
          to="/"
          className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </Link>

      </div>
    </div>
  );
};

export default Navbar;
import { Search, Heart, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center justify-between py-4">

      {/* Search Bar */}
      <div className="relative w-[500px]">
        <input
          type="text"
          placeholder="Search for a song..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#1d212b] text-white placeholder-gray-400 rounded-full py-3 pl-6 pr-12 outline-none text-sm"
        />

        <Search
          size={20}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/150?img=32"
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h2 className="text-white font-semibold text-lg">
              Molly Hunter
            </h2>

            <span className="px-2 py-0.5 bg-teal-900 text-teal-300 text-xs rounded-full">
              Premium
            </span>
          </div>
        </div>

        <Link
          to="/Likesong"
          className="w-12 h-12 rounded-full bg-[#1d212b] flex items-center justify-center"
        >
          <Heart size={20} />
        </Link>

        <button className="w-12 h-12 rounded-full bg-[#1d212b] flex items-center justify-center">
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
};

export default Header;
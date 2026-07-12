import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import MusicController from "./components/MusicController";
import Home from "./pages/Home";
import Artist from "./pages/Artist";
import Categories from "./components/Categories";
import LikedSong from "./components/Likesong";
import Login from "./Login";
import Signup from "./Signup";
import useSongs from "./hooks/useSongs";

function App() {
  const songs = useSongs();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Routes>

      {/* Auth Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Main App Routes */}
      <Route
        path="/*"
        element={
          <div className="h-screen bg-[#0f1117]">

            <div className="flex h-[calc(100vh-96px)] p-4 gap-4">

              <Navbar />

              <div className="flex-1 overflow-y-auto rounded-3xl">

                <Routes>

                  <Route
                    path="/home"
                    element={
                      <Home
                        songs={songs}
                        setCurrentIndex={setCurrentIndex}
                      />
                    }
                  />

                  <Route
                    path="/categories"
                    element={
                      <Categories
                        songs={songs}
                        setCurrentIndex={setCurrentIndex}
                      />
                    }
                  />

                  <Route
                    path="/artist"
                    element={<Artist />}
                  />

                  <Route
                    path="/likesong"
                    element={
                      <LikedSong
                        songs={songs}
                        setCurrentIndex={setCurrentIndex}
                      />
                    }
                  />

                </Routes>

              </div>

            </div>

            <MusicController
              songs={songs}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />

          </div>
        }
      />

    </Routes>
  );
}

export default App;
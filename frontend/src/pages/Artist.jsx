import { useState } from "react";
import axios from "axios";
import { Upload } from "lucide-react";

const Artist = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [preview, setPreview] = useState("");
  const [genre, setGenre] = useState("");

  const MAX_AUDIO_SIZE = 50 * 1024 * 1024; // 50MB
  const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!genre) {
      alert("Please select a genre");
      return;
    }

    if (!audio) {
      alert("Please upload an audio file");
      return;
    }

    if (!image) {
      alert("Please upload a cover image");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("image", image);
    formData.append("audio", audio);
    formData.append("genre", genre);

    try {
      await axios.post(
        "https://musice1.onrender.com/api/songs/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Song Uploaded Successfully");

      setTitle("");
      setArtist("");
      setImage(null);
      setAudio(null);
      setPreview("");
      setGenre("");

      e.target.reset();
    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    }
  };

  return (
    <div className="bg-[#0b0f19] flex justify-center items-center p-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-[#171b25] rounded-3xl p-6 shadow-2xl border border-gray-700"
      >
        <h1 className="text-3xl font-bold text-white mb-6">
          Upload Your Music
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          {/* LEFT SIDE */}
          <div>

            {/* AUDIO */}
            <label className="h-40 border-2 border-dashed border-gray-500 rounded-2xl flex flex-col justify-center items-center cursor-pointer hover:border-cyan-400 transition text-center px-4">

              {audio ? (
                <>
                  <div className="text-5xl">🎵</div>

                  <h2 className="text-green-400 font-semibold mt-3">
                    Audio Selected
                  </h2>

                  <p className="text-white text-sm mt-2 break-all">
                    {audio.name}
                  </p>

                  <p className="text-gray-400 text-xs mt-1">
                    {(audio.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </>
              ) : (
                <>
                  <Upload size={40} className="text-gray-300" />

                  <h2 className="text-xl text-white font-semibold mt-3">
                    Upload Audio File
                  </h2>

                  <p className="text-gray-400 text-sm mt-2">
                    Drag your mp3 file here
                    <br />
                    or click to browse
                  </p>

                  <p className="text-cyan-400 text-xs mt-0">
                    Max Audio Size: 50 MB
                  </p>
                </>
              )}

              <input
                hidden
                type="file"
                accept=".mp3,audio/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (!file) return;

                  if (file.size > MAX_AUDIO_SIZE) {
                    alert("Audio file must be less than 50 MB");
                    e.target.value = "";
                    return;
                  }

                  setAudio(file);
                }}
                required
              />
            </label>

            {/* IMAGE */}
            <h2 className="text-white mt-6 mb-3 font-semibold">
              Cover Art Upload
            </h2>

            <label className="h-28 w-66 border-2 border-dashed border-gray-500 rounded-xl flex justify-center items-center cursor-pointer overflow-hidden hover:border-cyan-400">

              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <Upload size={22} className="mx-auto" />
                  <p className="text-xs mt-2">
                    Upload your cover image
                  </p>

                  <p className="text-cyan-400 text-[11px] mt-1">
                    Max Image Size: 10 MB
                  </p>
                </div>
              )}

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (!file) return;

                  if (file.size > MAX_IMAGE_SIZE) {
                    alert("Image size must be less than 2 MB");
                    e.target.value = "";
                    return;
                  }

                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }}
                required
              />
            </label>
          </div>

          {/* RIGHT SIDE */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-white text-sm">
                Song Title
              </label>

              <input
                type="text"
                value={title}
                maxLength={50}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-2 bg-[#11151f] border border-gray-600 rounded-xl p-2.5 text-sm text-white outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm">
                Artist Name
              </label>

              <input
                type="text"
                value={artist}
                maxLength={30}
                onChange={(e) => setArtist(e.target.value)}
                className="w-full mt-2 bg-[#11151f] border border-gray-600 rounded-xl p-2.5 text-sm text-white outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm">
                Album Name
              </label>

              <input
                type="text"
                className="w-full mt-2 bg-[#11151f] border border-gray-600 rounded-xl p-2.5 text-sm text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-white text-sm">
                Genre
              </label>

              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
                className="w-full mt-2 bg-[#11151f] border border-gray-600 rounded-xl p-2.5 text-sm text-white outline-none focus:border-cyan-400"
              >
                <option value="">Select Genre</option>
                <option value="Pop">Pop</option>
                <option value="Rock">Rock</option>
                <option value="Hip Hop">Hip Hop</option>
                <option value="Rap">Rap</option>
                <option value="Classical">Classical</option>
              </select>
            </div>

            <div>
              <label className="text-white text-sm">
                Release Date
              </label>

              <input
                type="date"
                className="w-full mt-2 bg-[#11151f] border border-gray-600 rounded-xl p-2.5 text-sm text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-white text-sm">
                Copyright
              </label>

              <input
                type="text"
                className="w-full mt-2 bg-[#11151f] border border-gray-600 rounded-xl p-2.5 text-sm text-white outline-none focus:border-cyan-400"
              />
            </div>

          </div>
        </div>

        {/* STATUS */}
        <div className="mt-6">
          <p className="text-center text-gray-300 text-sm mb-2">
            Upload Status :
            <span className="text-white font-semibold">
              {audio ? " Ready to Upload" : " Awaiting File"}
            </span>
          </p>

          <div className="w-full h-2 rounded-full bg-gray-700 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${audio
                ? "w-full bg-green-500"
                : "w-1/3 bg-cyan-400"
                }`}
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:opacity-90 text-white font-semibold text-base"
        >
          Submit for Review
        </button>

      </form>
    </div>
  );
};

export default Artist;
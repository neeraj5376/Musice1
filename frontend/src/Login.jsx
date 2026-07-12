import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import headphone from "../public/headphone.png";
import bgimg from "../public/bgimg.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      

      navigate("/home");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };


  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-6 relative"
      
    ><img src={bgimg} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Main Container */}
      <div className="relative border border-white/30 rounded-3xl z-10 bg-black/60 rounded-3xl p-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-10 border border-white/10 shadow-2xl">

        {/* Left Side Image */}
        <div className="flex justify-center flex-1">
          <img
            src={headphone}
            alt="Headphone"
            className="w-[350px] lg:w-[450px] object-contain drop-shadow-2xl"
          />
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md">
          <div className="border border-white/30 rounded-3xl p-8 shadow-2xl">

            <h1 className="text-4xl font-bold text-white text-center mb-8">
              Log In
            </h1>

            <div className="space-y-5">

              {/* Email */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-300 outline-none focus:border-cyan-400"
              />

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 pr-12 text-white placeholder-gray-300 outline-none focus:border-cyan-400"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button className="text-gray-300 text-sm hover:text-cyan-400 transition">
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                className="w-full py-4 rounded-xl bg-white text-black font-semibold"
              >
                Log In
              </button>

              {/* Signup */}
              <p className="text-center text-gray-300">
                Don't have an account?
                <Link
                  to="/signup"
                  className="text-cyan-400 ml-1 hover:text-cyan-300"
                >
                  Sign Up
                </Link>
              </p>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
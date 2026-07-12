import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import headphone from "../public/headphone.png";
import { Link } from "react-router-dom";
import axios from "axios";
import bgimg from "../public/bgimg.jpg";





const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

         const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
   
const handleSignup = async () => {
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {
        const res = await axios.post(
            "http://localhost:5000/api/auth/signup",
            {
                name,
                email,
                password,
            }
        );

        alert("Account Created Successfully");

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    } catch (error) {
        alert(
            error.response?.data?.message ||
            "Signup Failed"
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

                {/* Left Side */}
                <div className="flex justify-center flex-1">
                    <img
                        src={headphone}
                        alt="Headphone"
                        className="w-[350px] lg:w-[450px] object-contain"
                    />
                </div>

                {/* Signup Form */}
                <div className="w-full max-w-md">
                    <div className="border border-white/30 rounded-3xl p-8 shadow-2xl">

                        <h1 className="text-4xl font-bold text-white text-center mb-8">
                            Sign Up
                        </h1>

                        <div className="space-y-5">

                            {/* Name */}
                            <div className="relative">
                                <User
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                                />

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Full Name"

                                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 outline-none focus:border-cyan-400"
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                                />

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 outline-none focus:border-cyan-400"
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                                />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 outline-none focus:border-cyan-400"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                                />

                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"

                                    className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 outline-none focus:border-cyan-400"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>

                            {/* Terms */}
                            <div className="flex items-center gap-2">
                                <input type="checkbox" />
                                <p className="text-sm text-gray-300">
                                    I agree to Terms & Conditions
                                </p>
                            </div>

                            {/* Signup Button */}
                            <button
                                onClick={handleSignup}
                                className="w-full py-4 rounded-xl bg-white text-black font-semibold"
                            >
                                Create Account
                            </button>

                            {/* Login Link */}
                            <p className="text-center text-gray-300">
                                Already have an account?
                                <Link
                                    to="/"
                                    className="text-cyan-400 ml-1 hover:text-cyan-300"
                                >
                                    Login
                                </Link>
                            </p>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Signup;
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInAnonymously } from "firebase/auth";
import { auth } from "../../FireBase";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiRefreshCw } from "react-icons/fi";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const validatePassword = (password) => password.length >= 6;

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!email || !validateEmail(email)) {
            setError("Please enter a valid email.");
            return;
        }
        if (!password || !validatePassword(password)) {
            setError("Password must be at least 6 characters.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);
        
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccess("Account created successfully! Redirecting...");
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleGoogleRegister = async () => {
        setError("");
        setSuccess("");
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            setSuccess("Account created successfully! Redirecting...");
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleGuestRegister = async () => {
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            await signInAnonymously(auth);
            setSuccess("Continuing as guest... Redirecting...");
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handlePhoneRegister = () => {
        navigate("/phone-login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-cyan-900 px-4">
            <div className="w-full max-w-md bg-black rounded-2xl shadow-2xl p-8 transition-transform transform hover:scale-105">
                <h2 className="text-3xl font-extrabold text-center mb-6 text-cyan-400 flex items-center justify-center gap-2">
                    <FiUser /> Create Account
                </h2>

                {error && <p className="bg-red-100 text-red-700 text-sm p-3 rounded-lg mb-4 text-center">{error}</p>}
                {success && <p className="bg-green-100 text-green-700 text-sm p-3 rounded-lg mb-4 text-center">{success}</p>}

                <form onSubmit={handleRegister} className="flex flex-col gap-5">
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border border-cyan-400 rounded-xl px-5 py-3 pl-12 outline-none focus:ring-2 focus:ring-cyan-400 transition bg-black text-cyan-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FiMail className="absolute left-3 top-3.5 text-cyan-400" />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password (min 6 chars)"
                            className="w-full border border-cyan-400 rounded-xl px-5 py-3 pl-12 pr-12 outline-none focus:ring-2 focus:ring-cyan-400 transition bg-black text-cyan-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FiLock className="absolute left-3 top-3.5 text-cyan-400" />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 text-cyan-400 hover:text-cyan-200"
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="w-full border border-cyan-400 rounded-xl px-5 py-3 pl-12 pr-12 outline-none focus:ring-2 focus:ring-cyan-400 transition bg-black text-cyan-400"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <FiLock className="absolute left-3 top-3.5 text-cyan-400" />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-cyan-400 hover:bg-cyan-500 text-black font-semibold py-3 rounded-xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? <FiRefreshCw className="animate-spin" /> : ""} {loading ? "Creating account..." : "Register"}
                    </button>
                </form>

                <div className="mt-6 flex flex-col gap-3">
                    <button
                        onClick={handleGoogleRegister}
                        className="w-full bg-black border border-cyan-400 hover:bg-cyan-900 flex items-center justify-center gap-2 py-3 rounded-xl transition shadow-sm hover:shadow-md text-cyan-400"
                    >
                        <FcGoogle size={22} /> Register with Google
                    </button>

                    <button
                        onClick={handlePhoneRegister}
                        className="w-full bg-cyan-700 hover:bg-cyan-800 flex items-center justify-center gap-2 py-3 rounded-xl transition shadow-sm hover:shadow-md text-black font-semibold"
                    >
                        Register with Phone
                    </button>

                    <button
                        onClick={handleGuestRegister}
                        className="w-full bg-gray-900 hover:bg-gray-800 text-cyan-400 font-semibold py-3 rounded-xl transition shadow-sm hover:shadow-md"
                    >
                        Continue as Guest
                    </button>
                </div>

                <p className="text-sm text-center mt-6 text-cyan-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-cyan-400 font-medium hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

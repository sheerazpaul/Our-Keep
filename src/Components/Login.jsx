import React, { useState } from "react";
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signInAnonymously,
    sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../../FireBase";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
    FiMail,
    FiLock,
    FiEye,
    FiEyeOff,
    FiUser,
    FiPhone,
    FiRefreshCw
} from "react-icons/fi";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (!email || !validateEmail(email)) {
            setError("Please enter a valid email.");
            return;
        }
        if (!password) {
            setError("Please enter your password.");
            return;
        }
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setSuccess("Login successful! Redirecting...");
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        setError("");
        setSuccess("");
        setLoading(true);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            setSuccess("Login successful! Redirecting...");
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    const handleGuestLogin = async () => {
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

    const handlePhoneLogin = () => {
        navigate("/phone-login");
    };

    const handleForgotPassword = async () => {
        if (!email || !validateEmail(email)) {
            setError("Please enter your email to reset password.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess("Password reset email sent!");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-cyan-100 px-4">
            <div className="w-full max-w-md bg-black rounded-2xl shadow-2xl p-8 transition-transform transform hover:scale-105">
                <h2 className="text-3xl font-extrabold text-center mb-6 text-cyan-400 flex items-center justify-center gap-2">
                    <FiUser /> Our Notes
                </h2>

                {error && (
                    <p className="bg-red-100 text-red-700 text-sm p-3 rounded-lg mb-4 text-center">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="bg-green-100 text-green-700 text-sm p-3 rounded-lg mb-4 text-center">
                        {success}
                    </p>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border border-gray-300 rounded-xl px-5 py-3 pl-12 outline-none focus:ring-2 focus:ring-cyan-400 transition text-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded-xl px-5 py-3 pl-12 pr-12 outline-none focus:ring-2 focus:ring-cyan-400 transition text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-cyan-400 hover:bg-cyan-500 text-black font-semibold py-3 rounded-xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? <FiRefreshCw className="animate-spin" /> : ""}
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="text-right mt-2">
                    <button
                        onClick={handleForgotPassword}
                        className="text-cyan-400 text-sm hover:underline"
                    >
                        Forgot Password?
                    </button>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full bg-white border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2 py-3 rounded-xl transition shadow-sm hover:shadow-md"
                    >
                        <FcGoogle size={22} /> Login with Google
                    </button>

                    <button
                        onClick={handlePhoneLogin}
                        className="w-full bg-cyan-500 hover:bg-cyan-600 flex items-center justify-center gap-2 py-3 rounded-xl transition shadow-sm hover:shadow-md text-white font-semibold"
                    >
                        <FiPhone /> Login with Phone
                    </button>

                    <button
                        onClick={handleGuestLogin}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-xl transition shadow-sm hover:shadow-md"
                    >
                        Continue as Guest
                    </button>
                </div>

                <p className="text-sm text-center mt-6 text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-cyan-400 font-medium hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

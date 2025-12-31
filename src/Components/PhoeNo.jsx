import React, { useState, useEffect } from "react";
import { auth } from "../../FireBase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { FiPhone, FiLock, FiRefreshCw, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function PhoneNo() {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtp, setShowOtp] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [resendTimer, setResendTimer] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    const validatePhone = (phone) => {
        const phoneNumber = parsePhoneNumberFromString(phone);
        return phoneNumber && phoneNumber.isValid();
    };

    const requestOTP = async () => {
        setError("");
        setSuccess("");
        if (!phone || !validatePhone(phone)) {
            setError("Please enter a valid phone number (e.g., +1234567890).");
            return;
        }
        setLoading(true);

        try {
            if (!window.recaptchaVerifier) {
                window.recaptchaVerifier = new RecaptchaVerifier(
                    "recaptcha-container",
                    { size: "invisible" },
                    auth
                );
            }

            const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
            setConfirmationResult(result);
            setShowOtp(true);
            setSuccess("OTP sent successfully! Check your phone.");
            setResendTimer(60);
        } catch (error) {
            setError("Failed to send OTP: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const verifyOTP = async () => {
        setError("");
        setSuccess("");
        if (!otp || otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }
        if (!confirmationResult) return;
        setLoading(true);

        try {
            await confirmationResult.confirm(otp);
            setSuccess("Phone verified successfully! Redirecting...");
            setTimeout(() => navigate("/"), 2000);
            setPhone("");
            setOtp("");
            setShowOtp(false);
        } catch (error) {
            setError("Invalid OTP: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const resendOTP = () => {
        if (resendTimer === 0) {
            requestOTP();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transition-transform transform hover:scale-105">
                <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 text-sm text-blue-500 hover:underline mb-4"
                >
                    <FiArrowLeft /> Back to Login
                </button>

                <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-600 flex items-center justify-center gap-2">
                    <FiPhone /> Phone Verification
                </h1>

                {error && <p className="bg-red-100 text-red-700 text-sm p-3 rounded-lg mb-4 text-center">{error}</p>}
                {success && <p className="bg-green-100 text-green-700 text-sm p-3 rounded-lg mb-4 text-center">{success}</p>}

                {!showOtp ? (
                    <div className="flex flex-col gap-5">
                        <div className="relative">
                            <input
                                type="tel"
                                placeholder="Enter phone (+1234567890)"
                                className="w-full border border-gray-300 rounded-xl px-5 py-3 pl-12 outline-none focus:ring-2 focus:ring-blue-400 transition"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <FiPhone className="absolute left-3 top-3.5 text-gray-400" />
                        </div>
                        <button
                            onClick={requestOTP}
                            disabled={loading}
                            className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loading ? <FiRefreshCw className="animate-spin" /> : <FiLock />} {loading ? "Sending..." : "Send OTP"}
                        </button>
                        <div id="recaptcha-container"></div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-5">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                className="w-full border border-gray-300 rounded-xl px-5 py-3 pl-12 outline-none focus:ring-2 focus:ring-green-400 transition"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                            />
                            <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                        </div>
                        <button
                            onClick={verifyOTP}
                            disabled={loading}
                            className={`w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loading ? <FiRefreshCw className="animate-spin" /> : ""} {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => { setShowOtp(false); setOtp(""); setError(""); setSuccess(""); }}
                                className="text-blue-500 hover:underline text-sm"
                            >
                                Change Phone Number
                            </button>
                            <button
                                onClick={resendOTP}
                                disabled={resendTimer > 0}
                                className={`text-sm ${resendTimer > 0 ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:underline"}`}
                            >
                                Resend OTP {resendTimer > 0 && `(${resendTimer}s)`}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PhoneNo;

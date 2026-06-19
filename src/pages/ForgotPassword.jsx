import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [step, setStep] = useState(1);

    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] =
        useState(false);

    const sendOtp = async () => {
        if (!phone) {
            alert("Enter phone number");
            return;
        }
        if (!/^\d{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit phone number");
            return;
        }
        try {
            setLoading(true);

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/otp/send`,
                { phone }
            );

            alert("OTP sent successfully");

            setStep(2);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to send OTP"
            );

        } finally {

            setLoading(false);

        }
    };

    const verifyOtp = async () => {
        if (!otp) {
            alert("Enter OTP");
            return;
        }

        try {
            setLoading(true);

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/otp/verify`,
                {
                    phone,
                    otp
                }
            );

            alert("OTP verified");

            setStep(3);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Invalid OTP"
            );

        } finally {

            setLoading(false);

        }
    };

    const resetPassword = async () => {
        if (!password || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/reset-password`,
                {
                    phone,
                    password
                }
            );

            setStep(4);

        } catch (error) {
            console.log(error);

            console.log(error.response?.data);
            alert(
                error.response?.data?.message ||
                "Password reset failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full">

                {/* Step 1 */}

                {step === 1 && (
                    <>
                        <h1 className="text-3xl font-bold text-center mb-2">
                            Forgot Password
                        </h1>

                        <p className="text-center text-gray-500 mb-8">
                            Enter your phone number
                        </p>

                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-xl p-3 mb-5"
                        />

                        <button
                            onClick={sendOtp}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                        >
                            {loading
                                ? "Sending OTP..."
                                : "Send OTP"}
                        </button>
                    </>
                )}

                {/* Step 2 */}

                {step === 2 && (
                    <>
                        <h1 className="text-3xl font-bold text-center mb-2">
                            Verify OTP
                        </h1>

                        <p className="text-center text-gray-500 mb-8">
                            Enter the OTP sent to your phone
                        </p>

                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) =>
                                setOtp(e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-xl p-3 mb-5"
                        />

                        <button
                            onClick={verifyOtp}
                            disabled={loading}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
                        >
                            {loading
                                ? "Verifying..."
                                : "Verify OTP"}
                        </button>
                    </>
                )}

                {/* Step 3 */}

                {step === 3 && (
                    <>
                        <h1 className="text-3xl font-bold text-center mb-2">
                            Reset Password
                        </h1>

                        <p className="text-center text-gray-500 mb-8">
                            Enter your new password
                        </p>

                        <div className="relative mb-4">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="New Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-gray-300 rounded-xl p-3"
                            />

                        </div>

                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            className="w-full border border-gray-300 rounded-xl p-3 mb-4"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            className="text-blue-600 font-semibold mb-5"
                        >
                            {showPassword
                                ? "Hide Password"
                                : "Show Password"}
                        </button>

                        <button
                            onClick={resetPassword}
                            disabled={loading}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold"
                        >
                            {loading
                                ? "Updating..."
                                : "Reset Password"}
                        </button>
                    </>
                )}

                {/* Step 4 */}

                {step === 4 && (
                    <div className="text-center">

                        <div className="text-6xl mb-4">
                            ✅
                        </div>

                        <h1 className="text-3xl font-bold text-green-600 mb-4">
                            Password Updated
                        </h1>

                        <p className="text-gray-600 mb-8">
                            Your password has been reset successfully.
                        </p>

                        <Link
                            to="/login"
                            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                        >
                            Login Now
                        </Link>

                    </div>
                )}

            </div>

        </div>
    );
};

export default ForgotPassword;
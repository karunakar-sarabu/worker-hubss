import React, { useState } from "react";
import axios from "axios";

const CareerAssistant = () => {

    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const askAI = async (question) => {

        try {

            setLoading(true);

            const phone =
                localStorage.getItem("userPhone");

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/chatbot`,
                {
                    phone,
                    question
                }
            );

            setAnswer(response.data.answer);

        } catch (error) {

            alert("Failed to get advice");

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-4xl mx-auto">

                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-3xl shadow-xl mb-8">

                    <h1 className="text-4xl font-bold">
                        🤖 AI Career Assistant
                    </h1>

                    <p className="mt-3 text-lg">
                        Get simple career guidance to earn more and find better opportunities.
                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

                    <button
                        onClick={() =>
                            askAI("How can I earn more money?")
                        }
                        className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl font-bold"
                    >
                        💰 How can I earn more money?
                    </button>

                    <button
                        onClick={() =>
                            askAI("What skill should I learn next?")
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl font-bold"
                    >
                        🛠 What skill should I learn next?
                    </button>

                    <button
                        onClick={() =>
                            askAI("How can I grow my career?")
                        }
                        className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl font-bold"
                    >
                        📈 How can I grow my career?
                    </button>

                    <button
                        onClick={() =>
                            askAI("How can I get more jobs?")
                        }
                        className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-xl font-bold"
                    >
                        💼 How can I get more jobs?
                    </button>

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <h2 className="text-2xl font-bold mb-4">
                        AI Advice
                    </h2>

                    {loading ? (

                        <p className="text-blue-600 font-semibold">
                            Getting advice...
                        </p>

                    ) : (

                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                            {answer || "Select a question above."}
                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default CareerAssistant;
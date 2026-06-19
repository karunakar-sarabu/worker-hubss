import React from "react";

const TrustStats = () => {

    const stats = [
        {
            number: "10,000+",
            label: "Workers"
        },
        {
            number: "2,000+",
            label: "Jobs Posted"
        },
        {
            number: "50+",
            label: "Cities Covered"
        },
        {
            number: "500+",
            label: "Verified Profiles"
        }
    ];

    return (
        <section className="py-20 bg-slate-50">

            <h2 className="text-4xl md:text-5xl font-bold text-center text-indigo-700 mb-4">
                Trusted Across Telangana
            </h2>

            <p className="text-center text-xl font-semibold text-indigo-500 mb-12">
                Connecting workers and employers every day
            </p>

            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">

                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-md p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300  grid-cols-2 md:grid-cols-4"  >
                        <h3 className="text-3xl font-bold text-green-600">
                            {item.number}
                        </h3>

                        <p className="mt-2 text-lg font-semibold text-gray-700">
                            {item.label}
                        </p>
                    </div>
                ))}

            </div>

        </section>
    );
};

export default TrustStats;
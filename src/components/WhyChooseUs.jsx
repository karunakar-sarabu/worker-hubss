import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-indigo-700 mb-4">
          Why Choose Daily Wage Connect?
        </h2>

        <p className="text-center text-xl font-semibold text-indigo-500 mb-14">
          Faster hiring. Better opportunities. Trusted connections.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-50 p-8 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold text-green-600 mb-4">
              ⚡ Quick Hiring
            </h3>

            <p className="text-gray-600">
              Employers can find workers quickly without lengthy recruitment processes.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              💼 More Job Opportunities
            </h3>

            <p className="text-gray-600">
              Workers can discover daily wage jobs from nearby locations.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl shadow-md">
            <h3 className="text-2xl font-bold text-orange-600 mb-4">
              🛡️ Verified Profiles
            </h3>

            <p className="text-gray-600">
              Verification features help build trust between workers and employers.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;
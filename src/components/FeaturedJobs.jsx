import React from 'react'
import { Link } from 'react-router-dom'
const FeaturedJobs = () => {

  const jobs = [
    {
      id: 1,
      title: "Construction Helper",
      location: "Hyderabad",
      wage: "₹700/day"
    },
    {
      id: 2,
      title: "Electrician",
      location: "Bhongir",
      wage: "₹900/day"
    },
    {
      id: 3,
      title: "Farm Worker",
      location: "Yadadri",
      wage: "₹600/day"
    },
    {
      id: 4,
      title: "Painter",
      location: "Warangal",
      wage: "₹800/day"
    }
  ]

  return (
    <section className="py-20 bg-slate-50">

      <h2 className="text-5xl font-bold text-blue-600 text-center">
        Featured Jobs
      </h2>

      <p className="text-xl font-semibold text-blue-400 text-center mt-4 mb-12">
        Latest opportunities from employers near you
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

        {jobs.map((job) => (
          <Link
            key={job.id}
            to="/available-jobs"
            className="bg-white rounded-2xl shadow-md p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 "  >
            <h3 className="text-xl font-bold text-slate-800">
              {job.title}
            </h3>

            <p className="mt-3 text-gray-600">
              📍 {job.location}
            </p>

            <p className="mt-2 text-green-600 font-bold text-lg">
              💰 {job.wage}
            </p>

            <p className="mt-4 text-sm text-green-600 font-medium">
              View Available Jobs →
            </p>
          </Link>
        ))}

      </div>

    </section>
  )
}

export default FeaturedJobs
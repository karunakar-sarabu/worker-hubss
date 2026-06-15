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
    <section className="py-16 px-6">

      <h2 className="text-3xl font-bold text-center mb-10">
        Featured Jobs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold">
              {job.title}
            </h3>

            <p className="text-gray-600 mt-2">
              {job.location}
            </p>

            <p className="text-green-600 font-bold mt-2">
              {job.wage}
            </p>

            <Link to="/available-jobs">
              <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                View Jobs
              </button>
            </Link>
          </div>
        ))}

      </div>

    </section>
  )
}

export default FeaturedJobs
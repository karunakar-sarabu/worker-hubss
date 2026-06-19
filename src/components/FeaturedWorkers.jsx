import React from 'react'

const FeaturedWorkers = () => {

  const workers = [
    {
      id: 1,
      name: "Ramesh",
      skill: "Construction",
      location: "Hyderabad",
      rating: 4.8
    },
    {
      id: 2,
      name: "Suresh",
      skill: "Electrician",
      location: "Bhongir",
      rating: 4.7
    },
    {
      id: 3,
      name: "Mahesh",
      skill: "Plumber",
      location: "Warangal",
      rating: 4.9
    },
    {
      id: 4,
      name: "Rajesh",
      skill: "Painter",
      location: "Nalgonda",
      rating: 4.6
    }
  ]

  return (
    <section className="py-20 bg-white">

      <h2 className="text-4xl md:text-5xl font-bold font-bold text-center mb-4 text-green-700">
        Featured Workers
      </h2>
      <p className="text-center text-xl font-semibold text-green-500 mb-12">
        Skilled workers ready for daily wage jobs
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

        {workers.map((worker) => (
          <div
            key={worker.id}
            className="bg-white rounded-2xl shadow-md p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 "  >
            <div className="text-4xl mb-3">
              👷
            </div>

            <h3 className="text-xl font-bold text-slate-800">
              {worker.name}
            </h3>

            <p className="mt-2 text-gray-600">
              🔧 {worker.skill}
            </p>

            <p className="text-gray-500 mt-1">
              📍 {worker.location}
            </p>

            <p className="text-yellow-500 mt-3 font-semibold  font-bold" >
              ⭐ {worker.rating}
            </p>
          </div>
        ))}

      </div>

    </section>
  )
}

export default FeaturedWorkers
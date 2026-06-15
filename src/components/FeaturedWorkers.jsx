import React from 'react'

const FeaturedWorkers = () => {

  const workers = [
    {
      id: 1,
      name: "Ramesh",
      skill: "Construction",
      location: "Hyderabad"
    },
    {
      id: 2,
      name: "Suresh",
      skill: "Electrician",
      location: "Bhongir"
    },
    {
      id: 3,
      name: "Mahesh",
      skill: "Plumber",
      location: "Warangal"
    },
    {
      id: 4,
      name: "Rajesh",
      skill: "Painter",
      location: "Nalgonda"
    }
  ]

  return (
    <section className="py-16 px-6">
      
      <h2 className="text-3xl font-bold text-center mb-10">
        Featured Workers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

        {workers.map((worker) => (
          <div
            key={worker.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold">
              {worker.name}
            </h3>

            <p className="text-gray-600 mt-2">
              {worker.skill}
            </p>

            <p className="text-gray-500 mt-1">
              {worker.location}
            </p>

            {/* <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
              View Profile
            </button> */}
          </div>
        ))}

      </div>

    </section>
  )
}

export default FeaturedWorkers
import React from 'react'

const Categories = () => {

  const categories = [
    "Mason",
    "Electrician",
    "Plumber",
    "Painter",
    "Carpenter",
    "Driver"
  ]

  return (
    <section className="py-20 bg-slate-50">

      <h2 className="text-4xl md:text-5xl font-bold font-bold text-center mb-4 text-orange-600 ">
        Popular Skills
      </h2>
      <p className="text-center text-xl font-semibold text-orange-500 mb-12">
        Most in-demand skills on the platform
      </p>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>

        {categories.map((category) => (
          <div
            key={category}
            className=" hover:scale-105 hover:shadow-xl transition-all duration-300  bg-white shadow-md rounded-xl h-32 flex flex-col justify-center items-center"
          >
            <>
              <div className="text-3xl mb-2">
                🔧
              </div>

              <div className="font-semibold">
                {category}
              </div>
            </>
          </div>
        ))}

      </div>

    </section>
  )
}

export default Categories
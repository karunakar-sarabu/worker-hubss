import React from 'react'

const Categories = () => {

  const categories = [
    "Construction",
    "Agriculture",
    "Electrician",
    "Plumber",
    "Painter",
    "Carpenter"
  ]

  return (
    <section className='py-16 px-6'>
      
      <h2 className='text-3xl font-bold text-center mb-10'>
        Popular Categories
      </h2>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>

        {categories.map((category) => (
          <div
            key={category}
            className='bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg cursor-pointer'
          >
            {category}
          </div>
        ))}

      </div>

    </section>
  )
}

export default Categories
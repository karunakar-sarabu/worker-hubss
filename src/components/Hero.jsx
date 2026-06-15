import React from 'react'
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <section className='flex flex-col items-center text-center py-20'>
      <h1 className='text-5xl font-bold'>
        Daily Wage Connect
      </h1>

      <p className='mt-4 text-lg text-gray-600'>
        Find Work. Find Workers.
      </p>

      <div className='flex gap-4 mt-8'>

        <Link to="/worker-register">
          <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition'>
            Find Jobs
          </button>
        </Link>

        <Link to="/employer-register">
          <button className='bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition'>
            Hire Workers
          </button>
        </Link>

      </div>
    </section>
  )
}

export default Hero
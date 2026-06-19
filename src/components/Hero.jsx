// import React from 'react'
// import { Link } from 'react-router-dom'
// const Hero = () => {
//   return (
//     <section className='flex flex-col items-center text-center py-20'>
//       <h1 className='text-4xl md:text-5xl font-bold font-bold'>
//         Daily Wage Connect
//       </h1>

//       <p className='mt-4 text-lg text-gray-600'>
//         Find Work. Find Workers.
//       </p>

//       <div className='flex gap-4 mt-8'>

//         <Link to="/worker-register">
//           <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition'>
//             Find Jobs
//           </button>
//         </Link>

//         <Link to="/employer-register">
//           <button className='bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition'>
//             Hire Workers
//           </button>
//         </Link>

//       </div>
//     </section>
//   )
// }

// export default Hero
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative min-h-[75vh] flex items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 px-6 max-w-4xl">

        <p className="text-green-400 font-semibold mb-4">
          Daily Wage Connect
        </p>

        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Find Daily Jobs.
          <br />
          Hire Skilled Workers.
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-200">
          Connecting workers and employers across India.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

          <Link to="/worker-register">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl transition">
              Find Jobs
            </button>
          </Link>

          <Link to="/employer-register">
            <button className="border border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-xl transition">
              Hire Workers
            </button>
          </Link>

        </div>
        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 text-white">

          <div>
            <h3 className="text-3xl font-bold text-green-400">
              10,000+
            </h3>
            <p className="text-gray-300">
              Workers
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-blue-400">
              2,000+
            </h3>
            <p className="text-gray-300">
              Jobs Posted
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-orange-400">
              50+
            </h3>
            <p className="text-gray-300">
              Cities
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-yellow-400">
              4.8★
            </h3>
            <p className="text-gray-300">
              User Rating
            </p>
          </div>

        </div>
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">

          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white">
            ✓ Verified Workers
          </div>

          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white">
            ✓ Direct WhatsApp Contact
          </div>

          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white">
            ✓ Free Registration
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import FeaturedWorkers from '../components/FeaturedWorkers'
import FeaturedJobs from '../components/FeaturedJobs'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Hero/>
      <Categories/>
      <FeaturedWorkers/>
      <FeaturedJobs/>
      <Footer/>
    </>
  )
}

export default Home
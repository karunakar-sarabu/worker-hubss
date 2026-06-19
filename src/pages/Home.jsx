import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import FeaturedWorkers from '../components/FeaturedWorkers'
import FeaturedJobs from '../components/FeaturedJobs'
import Footer from '../components/Footer'
import HowItWorks from "../components/HowItWorks";
import TrustStats from "../components/TrustStats";
import WhyChooseUs from '../components/WhyChooseUs'
import CallToAction from "../components/CallToAction";

const Home = () => {
  return (
    <>
       <Hero />
       <WhyChooseUs/>
      <FeaturedJobs />
      <FeaturedWorkers />
      <Categories />
      <HowItWorks />
      <TrustStats />
      <CallToAction/>
      <Footer />
    </>
  )
}

export default Home
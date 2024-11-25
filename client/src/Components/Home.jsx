// import React from 'react'

// import Hero from "./HeroComponent/Hero"
import Navbar from "./Navbar"
import { Outlet } from "react-router"

import Footer from "./Footer"

const Home = () => {



  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div>
        <Outlet/>
      </div>
      {/* <Hero /> */}
      <Footer/>
    </div>
  )
}

export default Home
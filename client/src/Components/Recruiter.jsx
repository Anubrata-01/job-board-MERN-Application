import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'
import Footer from './Footer'
import JobPost from './RecruiterComponents/JobPost'

const Recruiter = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar/>
      <JobPost/>
      <div>
        <Outlet/>
      </div>
    <Footer/>
    </div>
  )
}

export default Recruiter
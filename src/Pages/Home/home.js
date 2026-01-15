import React from 'react'
import HomePage from '../../Components/HomePage/homePage'
import SideNavbar from '../../Components/SideNavbar/sideNavbar_TEMP'
import './home.css'

const Home = ({ sideNavbar }) => {
  return (
    <div className="Home">
        <SideNavbar sideNavbar={sideNavbar} />
        <HomePage />
    </div>
  )
}

export default Home

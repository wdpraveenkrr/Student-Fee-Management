import React from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <div className='flex items-start'>
        <Sidebar/>
        </div>
    </div>
  )
}

export default Home
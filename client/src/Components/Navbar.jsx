import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import rightarrow from '../assets/rightarrow.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {

  const navigate = useNavigate()

  const backendUrl = 'http://localhost:4000'

  const logout = async () => {
    try {

      axios.defaults.withCredentials = true

      const { data } = await axios.post(backendUrl + '/api/admin/logout')

      if (data.success) {
        navigate('/')
        toast.success(data.message)
      }



    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <div className='w-full flex h-15 justify-between items-center p-2 sm:p-6 sm:px-24 absolute top-0 bg-blue-300 '>
      <img src={logo} alt="" className='w-5 sm:w-15' />
      
      <p>Prince Institution - Admin Page </p>          

        <button className='flex items-center gap-2 border border-r-gray-500 rounded-full px-6 py-1 text-gray-800 hover:bg-gray-100 transition-all '
          onClick={() => logout()}     >   Logout      
        </button>

      
    </div>
  )
}

export default Navbar
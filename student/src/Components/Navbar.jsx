import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import rightarrow from '../assets/rightarrow.png'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {

  const navigate = useNavigate()

  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent)

  const userId = userData

  
// console.log(document.cookie.valueOf());


  const logout = async () => {
    try {

      axios.defaults.withCredentials = true

      const { data } = await axios.post(backendUrl + '/api/student/logout')

      data.success && setIsLoggedin(false)
      data.success && setUserData(false)
      navigate('/')
      toast.success(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const sendVerificationOtp = async () => {

    try {

      // axios.defaults.withCredentials = true


      const api = axios.create({
        baseURL: backendUrl,          // your backend base URL
        withCredentials: true,        // always send cookies/session
        headers: {
          "Content-Type": "application/json",
        },
      });


      const { data } = await api.post(backendUrl + '/api/student/send-verify-otp')

      if (data.success) {
        navigate('/verify-email')
        // console.log(data);        
        toast.success(data.message)
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  return (
    <div className='w-full flex h-10 justify-between items-center p-2 sm:p-6 sm:px-24 absolute top-0 bg-blue-300'>
      <img src={logo} alt="" className='w-5 sm:w-15' />
      <p>Prince Institution</p>
      {userData ?
        <div className='uppercase w-8 h-8 border flex justify-center items-center rounded-full bg-black text-white relative group '>
          {(userData.name[0])}
          <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
            <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
              {!userData.isAccountVerified &&
                <li onClick={()=>sendVerificationOtp()} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify email</li>
              }
              <li onClick={() => logout()} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-12'>Logout</li>
            </ul>
          </div>
        </div>

        : <button className='flex items-center gap-2 border border-r-gray-500 rounded-full px-6 py-1 text-gray-800 hover:bg-gray-100 transition-all '
          onClick={() => navigate('/login')}    >   Login
          <img src={rightarrow} alt="" className='w-5' />
        </button>

      }
    </div>
  )
}

export default Navbar
import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import man from '../assets/man.png'
import mail from '../assets/email.png'
import lock from '../assets/lock.png'
import { useNavigate } from 'react-router-dom'

import Axios from 'axios'
import { toast } from 'react-toastify'
import { ApiContext } from '../Context/ApiContext'


const Login = () => {

  const {backendUrl}=useContext(ApiContext)

  const navigate = useNavigate()

  // console.log(backendUrl);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')




  const onSubmitHandler = async (e) => {

    e.preventDefault()

     

    try {

      // Axios.defaults.withCredentials = true

          const api = Axios.create({
          baseURL: backendUrl,          // your backend base URL
          withCredentials: true,        // always send cookies/session
          headers: {
            "Content-Type": "application/json",
          },
        });


        const { data } = await api.post(backendUrl +'/api/admin/login',{email, password}, {withCredentials:true})


        if (data.success) {
          navigate('/home')       
          toast.success(data.message)

        } else {
          toast.error(data.message)
        }

    

    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-6  sm:px-0 bg-gradient-to-br from-orange-200 to-yellow-400' >

      <img onClick={() => navigate("/")} src={logo} alt="" className='w-15 absolute left-5 sm:left-20 top-5  sm:w-20 cursor-pointer  ' />

      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm' >
        <h2 className='text-3xl font-semibold text-white text-center mb-3' >Admin Login</h2>
        <p className='text-center text-sm mb-6' >Login to your account</p>

        <form onSubmit={onSubmitHandler}>   

          <div className='border mb-4 flex  items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-700 ' >
            <img src={mail} alt="" className='w-6' />
            <input type="text" placeholder='Enter Email Id' required onChange={(e) => setEmail(e.target.value)} value={email} className='outline-none' />
          </div>

          <div className='border mb-4 flex  items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-700 ' >
            <img src={lock} alt="" className='w-6' />
            <input type="password" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} value={password} required className='outline-none' />
          </div>

          <p onClick={() => navigate("/reset-password")} className='mb-4 text-indigo-500 cursor-pointer'>Forgot Password?</p>
          <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>Login</button>

        </form>  
          
          
          



      </div>

    </div>
  )
}

export default Login
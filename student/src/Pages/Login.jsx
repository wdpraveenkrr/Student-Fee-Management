import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import man from '../assets/man.png'
import mail from '../assets/email.png'
import lock from '../assets/lock.png'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import Axios from 'axios'
import { toast } from 'react-toastify'


const Login = () => {

  const navigate = useNavigate()

  const { backendUrl, setIsLoggedin , getUserData} = useContext(AppContent)

  console.log(backendUrl);

  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [studid, setStudid]=useState('')

  

 





  const onSubmitHandler = async (e) => {

    e.preventDefault()

     

    try {

      // Axios.defaults.withCredentials = true

          const api = Axios.create({
          baseURL: backendUrl,          // your backend base URL
          withCredentials: true,        // always send cookies/session
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://prince-institution.onrender.com"
          },
        });

      if (state === "Sign Up") {

    

        const { data } = await api.post(backendUrl + '/api/student/register', {name, email, password })

        if (data.success) {
          setIsLoggedin(true)
          setState(Login)          
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }


      } else {

        const { data } = await api.post(backendUrl + '/api/student/login',{email, password})


        if (data.success) {
          navigate('/home')          
          setIsLoggedin(true)
          getUserData()       
          toast.success(data.message)

        } else {
          toast.error(data.message)
        }

      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-6  sm:px-0 bg-gradient-to-br from-orange-200 to-yellow-400' >

      <img onClick={() => navigate("/")} src={logo} alt="" className='w-15 absolute left-5 sm:left-20 top-5  sm:w-20 cursor-pointer  ' />

      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm' >
        <h2 className='text-3xl font-semibold text-white text-center mb-3' >{state === "Sign Up" ? 'Create account' : 'Login'}</h2>
        <p className='text-center text-sm mb-6' >{state === "Sign Up" ? 'Create your account' : 'Login to your account'}</p>

        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
<>

      

            <div className='border mb-4 flex  items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-700 ' >
              <img src={man} alt="" className='w-6' />
              <input type="text" placeholder='Enter Name' onChange={(e) => setName(e.target.value)} value={name} required className='outline-none' />
            </div>
            </>

          )}

          <div className='border mb-4 flex  items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-700 ' >
            <img src={mail} alt="" className='w-6' />
            <input type="text" placeholder='Enter Email Id' required onChange={(e) => setEmail(e.target.value)} value={email} className='outline-none' />
          </div>

          <div className='border mb-4 flex  items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-700 ' >
            <img src={lock} alt="" className='w-6' />
            <input type="password" placeholder='Enter password' onChange={(e) => setPassword(e.target.value)} value={password} required className='outline-none' />
          </div>

          <p onClick={() => navigate("/reset-password")} className='mb-4 text-indigo-500 cursor-pointer'>Forgot Password?</p>
          <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>{state}</button>

        </form>
        {state === "Sign Up" ? (<p className='text-gray-400 text-center text-xs mt-4'>Already have an account? {""}
          <span onClick={() => setState('Login')} className='text-blue-400 cursor-pointer underline'> Login here</span>
        </p>) :

          (
            <p className='text-gray-400 text-center text-xs mt-4'>Don't have an account? {""}
              <span onClick={() => setState('Sign Up')} className='text-blue-400 cursor-pointer underline'> Sign Up</span>
            </p>
          )}



      </div>

    </div>
  )
}

export default Login

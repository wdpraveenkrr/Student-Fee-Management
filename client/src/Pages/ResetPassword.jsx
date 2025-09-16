import React, { useContext, useRef, useState } from 'react'
import logo from '../assets/logo.png'
import man from '../assets/man.png'
import lock from '../assets/lock.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ApiContext } from '../Context/ApiContext'

const ResetPassword = () => {

  const {backendUrl}=useContext(ApiContext)

  const navigate = useNavigate()

  const inputRefs = useRef([])


  const [email, setEmail] = useState('')  

  const [isEmailSent,setIsEmailSent]=useState('')
  const [otp,setOtp]=useState(0)
  const [newPassword, setNewPassword]  =useState('')
  const [isOtpSubmitted,setIsOtpSubmitted]=useState(false)


  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboarData.getData("text")
    const pasteArray = paste.split("")
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    })
  }


  const api = axios.create({
          baseURL: backendUrl,          // your backend base URL
          withCredentials: true,        // always send cookies/session
          headers: {
            "Content-Type": "application/json",
          },
        });


  const onSubmitEmail = async(e)=>{
    e.preventDefault()
    try {
      const {data} = await api.post(backendUrl + '/api/admin/send-reset-otp',{email})

      if(data.success){
        toast.success(data.message)
        setIsEmailSent(true)
      }
    } catch (error) {      
      toast.error(error.message)
    }

  }


    const onSubmitOtp = async(e)=>{
      e.preventDefault()
  
      const otpArray = inputRefs.current.map(e => e.value)
      setOtp((otpArray.join('')))
      setIsOtpSubmitted(true)
      // setIsEmailSent(true)
      
      try {
        
      } catch (error) {
        
      }
  
    }

    const onSubmitNewPassword = async(e)=>{
      e.preventDefault()
      try {

        const {data} = await api.post(backendUrl + '/api/admin/reset-password', {email, otp, newPassword})

        if(data.success)
        {
          toast.success(data.message)
          navigate('/')
        }else{
          toast.error(data.message)
        }

      } catch (error) {
        toast.error(error.message)
      }
    }

      

  return (
    <div className='flex items-center justify-center min-h-screen px-6  sm:px-0 bg-gradient-to-br from-orange-200 to-yellow-400' >

      <img onClick={() => navigate("/")} src={logo} alt="" className='w-15 absolute left-5 sm:left-20 top-5  sm:w-20 cursor-pointer  ' />

{!isEmailSent &&

     
         <form  onSubmit={onSubmitEmail} className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>

          <h2 className='text-3xl font-semibold text-white text-center mb-3' >Reset Password</h2>
          <p className='text-center text-sm mb-6' >Enter your Register Email address</p>

          <div className='border mb-4 flex  items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-700 ' >
            <img src={man} alt="" className='w-6' />
            <input type="text" placeholder='Enter Email Id' onChange={(e) => setEmail(e.target.value)} value={email} required className='outline-none' />
          </div>


          <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>Submit</button>

        </form>
}
      

      {!isOtpSubmitted && isEmailSent && 


      <form  onSubmit={onSubmitOtp} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
        <p className='text-center mb-6 text-indigo-300' > Enter the 6-digit code sent to your email id.</p>

        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input type="text" maxLength={1} ref={e => inputRefs.current[index] = e} key={index} required

              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}

              className='w-12 h-12 bg-[#333a5c] text-white text-center text-xl'
            />
          ))}
        </div>
        <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full' >Verify email</button>
      </form>
}
      

    {isOtpSubmitted && isEmailSent && 

        <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>

          <h2 className='text-3xl font-semibold text-white text-center mb-3' >New Password</h2>
          <p className='text-center text-sm mb-6' >Enter the new password below</p>

          <div className='border mb-4 flex  items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-700 ' >
            <img src={lock} alt="" className='w-6' />
            <input type="text" placeholder='Enter Password' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} required className='outline-none' />
          </div>


          <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>Submit</button>

        </form>

   
}

    </div>
  )
}

export default ResetPassword
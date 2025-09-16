import React, { useContext, useRef } from 'react'
import logo from '../assets/logo.png'
import axios from 'axios'
import { AppContent } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const EmailVerify = () => {

  

  const navigate = useNavigate()

  const inputRefs = useRef([])

  const {backendUrl, isLoggedin , userData, getUserData}=useContext(AppContent)
  
  const handleInput = (e, index)=>{
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
      inputRefs.current[index + 1].focus();
    }
  }

  const handleKeyDown =(e, index)=>{
    if(e.key === 'Backspace' && e.target.value === '' && index > 0){
      inputRefs.current[index-1].focus()
    }
  }

  const handlePaste = (e)=>{
    const paste = e.clipboarData.getData("text")
    const pasteArray = paste.split("")
    pasteArray.forEach((char, index)=>{
      if(inputRefs.current[index]){
        inputRefs.current[index].value=char;
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

  const onSubmitHandler = async(e)=>{

    try {

        e.preventDefault()
        const otpArray = inputRefs.current.map(e=>e.value)

        const otp = otpArray.join('')
        const {data} = await api.post(backendUrl + '/api/student/verify-account', {otp})

        if(data.success){
          console.log(data.message);
          toast.success(data.message)
          
          navigate('/')            
            getUserData()
        }
        else{
          toast.error(data.message)
          console.log(data.message);
          
        }



    } catch (error) {
      
    }

  }




  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-200 to-yellow-400'>
      
      <img onClick={() => navigate("/")} src={logo} alt="" className='w-15 absolute left-5 sm:left-20 top-5  sm:w-20 cursor-pointer  ' />

      <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
            <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
            <p className='text-center mb-6 text-indigo-300' > Enter the 6-digit code sent to your email id.</p>

            <div className='flex justify-between mb-8' onPaste={handlePaste}>
              {Array(6).fill(0).map((_,index)=>(
                <input type="text" maxLength={1} ref={e=>inputRefs.current[index] = e} key={index} required

                onInput={(e)=>handleInput(e, index)}
                onKeyDown={(e)=>handleKeyDown(e, index)}

                className='w-12 h-12 bg-[#333a5c] text-white text-center text-xl'
                />
              ))}
            </div>
            <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full' >Verify email</button>
      </form>
    </div>
  )
}

export default EmailVerify
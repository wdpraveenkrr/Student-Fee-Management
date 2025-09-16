import React, { useContext, useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import { ApiContext } from '../Context/ApiContext';

const AddStudent = () => {

  const {backendUrl}=useContext(ApiContext)

  const navigate = useNavigate()
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const onClickResetHandler = () => {
    setName("")
    setEmail("")
    setPassword("")
  }




  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {


      const formData = new FormData();

      formData.append("name", name)
      formData.append("email", email)
      formData.append("password", password)

      formData.forEach((value, key) => {
        console.log(`${key}`, value);
      })


      const { data } = await Axios.post(backendUrl + '/api/student/register', formData, {
        headers: {
          "Content-Type": "application/json",  // tells server you are sending JSON
          "Authorization": "Bearer yourTokenHere", // if you use JWT token
          "Custom-Header": "value123",          // any custom header     }
        }
      })

      if (data.success) {
        console.log(data.message);
        toast.success(data.message);
        navigate("/studentlist")
      }
      else {
        console.log(data.message);
      }


    } catch (error) {

    }

  }


  return (

      <div>
          <Navbar/>
          
          <div className='flex mt-5'>
          
          <Sidebar/> 
    <form action="" onSubmit={onSubmitHandler} className='m-5 w-full mt-15'>
      <p className='mb-3 text-lg font-medium'>Add Student</p>

      <div className='bg-white px-8 border rounded w-xl  p-5' >

          <div className='lg:flex-1 flex flex-col gap-4 '>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Name</p>
              <input type="text" placeholder='Name' required value={name} onChange={(e) => setName(e.target.value)} className='border rounded px-3 py-1 ' />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Email</p>
              <input type="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} className='border rounded px-3 py-1' />
            </div>

            <div className='flex flex-col gap-1'>
              <p>Password</p>
              <input type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} className='border rounded px-3 py-1' />
            </div>

            <div className='flex gap-1'>
              <button className='bg-blue-500 text-white px-8 py-1  rounded m-2 ' type='submit' >Add Student</button>
              <button className='bg-black text-white px-8 py-1 rounded m-2 ' onClick={onClickResetHandler}  >Reset</button>
            </div>

          </div>     

      </div>
    </form>
    </div>
    </div>
  )
}

export default AddStudent


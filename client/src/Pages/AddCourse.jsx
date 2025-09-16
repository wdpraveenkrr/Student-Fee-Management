import React, { useContext } from 'react'
import { toast } from "react-toastify";
import coursepic from '../assets/course-pic.png'
import { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import { ApiContext } from '../Context/ApiContext';

const AddCourse = () => {

  const {backendUrl} = useContext(ApiContext)

  const navigate = useNavigate();
  
  const [cname, setCname] = useState("")
  const [cfee, setCfee] = useState("")
  const [cduration, setCduration] = useState('2')
  const [ctopics, setCtopics] = useState("")
  const [cdescription, setCdescription] = useState("")

  const onClickResetHandler =()=>{
    setPreview("")
    setCname("")
    setCfee("")
    setCduration("")
    setCtopics("")
    setCdescription("")
  }



  const onSubmitHandler = async (e) => {
    e.preventDefault();
 
   
    try {   
      
      const formData = new FormData();

      formData.append("cname", cname)
      formData.append("cfee", cfee)
      formData.append("cduration", cduration)      
      formData.append("ctopics", ctopics)      
      formData.append("cdescription", cdescription)

      formData.forEach((value, key) => {
        console.log(`${key}`, value);
      })


      const { data } = await Axios.post(backendUrl +'/api/course/add', formData, {
        headers: {
          "Content-Type": "application/json",  // tells server you are sending JSON
          "Authorization": "Bearer yourTokenHere", // if you use JWT token
          "Custom-Header": "value123",          // any custom header     }
      }})

      if (data.success) {
        console.log(data.message);
        toast.success(data.message); 
        navigate("/courselist")  
      }
      else {
        console.log(data.message);
      }

    } catch (error) {

    }
      
  }
  // console.log(cpic);

  const [preview, setPreview] = useState();






  return (
    
      <div>
      <Navbar/>      
      <div className='flex mt-5'>
      
      <Sidebar/> 
    <form onSubmit={onSubmitHandler} className='m-5 w-4xl mt-15'>
      <p className='mb-3 text-lg font-medium'>Add Course</p>

      <div className='bg-white px-8 border rounded overflow-y-scroll' >

       
        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600 mt-5'>
          <div className='w-xl lg:flex-1 flex flex-col gap-2'>

            <div className='flex-1 flex flex-col gap-1 w-3xl'>
              <p>Course Name</p>
              <input type="text" placeholder='Enter Course Name' value={cname} required onChange={(e) => setCname(e.target.value)} className='border rounded px-3 py-1' />
            </div>

            <div className='flex-1 flex flex-col gap-1 w-3xl' >
              <p>Course Fee</p>
              <input type="number" placeholder='Enter Course Fee' value={cfee} onChange={(e) => setCfee(e.target.value)} required className='border rounded px-3 py-1' />
            </div>

            <div className='flex-1 flex flex-col gap-1 w-3xl'>
              <p>Course Duration</p>
              <select name="" id="" className='border rounded px-3 py-1' value={cduration} onChange={(e) => setCduration(e.target.value)} >
                <option value="2">2 Months</option>
                <option value="3">3 Months</option>
                <option value="4">4 Months</option>
                <option value="5">5 Months</option>
                <option value="6">6 Months</option>
                <option value="7">7 Months</option>
                <option value="8">8 Months</option>
                <option value="9">9 Months</option>
              </select>

            </div>
            

            <div className='flex-1 flex flex-col gap-1 mt-0'>
              <p className='mt-1 mb-2'>Course Description</p>
              <textarea name="" id="" className='w-3xl h-40 px-4 pt-2 border rounded ' value={cdescription} onChange={(e) => setCdescription(e.target.value)} placeholder="Enter Course description"></textarea>
            </div>

            <div className='flex-1 flex flex-col gap-1 mt-0'>
              <p className='mt-1 mb-2'>Key Topics</p>
              <textarea name="" id="" className='w-3xl h-40 px-4 pt-2 border rounded ' value={ctopics} onChange={(e) => setCtopics(e.target.value)} placeholder="Enter Course Key Topics"></textarea>
            </div>
            
          </div>



        </div>


        <button className='bg-blue-500 text-white px-8 py-2 rounded m-3 mt-5 ' type='submit'  >Add Student</button>
        <button className='bg-black text-white px-8 py-2 rounded m-3 ' onClick={onClickResetHandler}  >Reset</button>
      </div>
    </form>
    </div>
    </div>
  )
}

export default AddCourse



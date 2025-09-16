import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';

const ViewCourse = () => {

  const navigate = useNavigate();

    const [records, setRecords]=useState("")
    const {id} = useParams();

    useEffect(() => {
      // Fetch from backend
      fetch(`http://localhost:4000/api/course/list/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setRecords(data.data); // store only "data" array
            console.log("Hints--->", data.data);
            
          }
        })
        .catch((err) => console.error(err));
    }, [id]);
  
  
    console.log(records);

  return (
      <div>
      <Navbar/>      
      <div className='flex mt-5'>      
      <Sidebar/> 
    <form className='m-5 w-4xl mt-15 '>
      <div className='flex justify-between p-3'>
      <p className='mb-3 text-lg font-medium'>Course Details</p>
      <button onClick={()=>navigate("/courselist")} className=' cursor-pointer bg-black text-white  py-2 px-7 font-semibold rounded-full' > Go to Courselist</button>
      </div>

      <div className='bg-white px-8  rounded w-full max-h-[80vh] ' >

            
              <div className='flex mt-1 items-center'>
                <p className='-2 mr-1 w-35 font-bold '>Course Name</p>
                <p className='p-2'>:</p>
                <p className=' p-2'>{records.cname}</p>
              </div>

              <div className='flex items-center'>
                <p className='-2 mr-1 w-35 font-bold'>Course Fee</p>
                <p className='p-2'>:</p>
                <p className=' p-2'>Rs.{records.cfee} /-</p>
              </div>

              <div className='flex items-center'>
                <p className='-2 mr-1 w-35 font-bold'>Course Duration</p>
                <p className='p-2'>:</p>
                <p className=' p-2'>{records.cduration} Months</p>
              </div>

              <div className='items-center mt-2 '>

                <p className='-2 mr-1 w-45 font-bold'>Course Description</p>
                <p className='flex text-justify  p-2'>{records.cdescription}</p>

                <p className='-2 mr-1 w-35 font-bold'>Key Topics</p>
                <p className="flex text-justify p-2" >{records.ctopics}</p>
              </div>

           

            </div>

   
    </form>
    </div>
    </div>
  )
}

export default ViewCourse

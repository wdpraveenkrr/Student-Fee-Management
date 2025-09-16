import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom'
import Navbar from '../Components/Navbar';
import Header from './Header';
import { AppContent } from '../context/AppContext';

const Mycourse = () => {

  const {userData, backendUrl}=useContext(AppContent)

  const navigate = useNavigate();

  const [coursedetails, setCoursedetails] = useState("")


  const  id  =userData.studentid;

  useEffect(() => {

    // Fetch from backend
    fetch(backendUrl + `/api/student/list/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCoursedetails(data.data.studentCourseDetails); // store only "data" array
     
        }
      })
      .catch((err) => console.error(err));
  },[]);





  return (

    <div className='flex'>
      <Navbar />
      <Header />

      <form className='mt-15   '>


        <div className='bg-white px-8 p-3 rounded w-200 min-h-[80vh] ' >
          <div className='p-5'>
            <div className='flex justify-between mr-3' >
              <p className='-2 mr-1 mb-3 w-60 text-1xl font-bold border-b-2 p-2'>Student's Course Details</p>
            </div>


            {coursedetails && coursedetails.map((data, index) => (

              <div className='border mt-3 p-4' key={index}>

                <div className='flex items-center' key={index}>
                  <p className='-2 mr-1 w-35 font-bold'>Course Name</p>
                  <p className='p-2'>:</p>

                  <p className=' p-2'>{data.coursename}</p>
                </div>

                <div className='flex items-center'>
                  <p className='-2 mr-1 w-35 font-bold'>Course Duration</p>
                  <p className='p-2'>:</p>
                  <p className=' p-2'> {data.courseduration} Months</p>
                </div>

                <div className='flex items-center'>
                  <p className='-2 mr-1 w-35 font-bold'>Total Amount</p>
                  <p className='p-2'>:</p>
                  <p className=' p-2'>Rs.{data.coursefee}/-</p>
                </div>

                <div className=''>
                  <button className='bg-blue-600 text-white p-1 px-5  m-2  rounded-full ' onClick={() => navigate(`/my-course/${id}/details/${data._id}`)} >View</button>

                </div>

              </div>

            ))}




          </div>

        </div>
      </form>

    </div>
  )
}

export default Mycourse

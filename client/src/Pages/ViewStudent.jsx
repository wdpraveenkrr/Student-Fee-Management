import React, { useContext } from 'react'
import { toast } from "react-toastify";
import { useState } from 'react'
import { useEffect } from 'react';
import Axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import { ApiContext } from '../Context/ApiContext';

const ViewStudent = () => {
  
  const {backendUrl}=useContext(ApiContext)

  const navigate = useNavigate();
  const { id } = useParams(); 

  const [records, setRecords] = useState("")
  const[coursedetails,setCoursedetails]=useState("")  

  const [studid, setStudid]=useState("")    

  const getStudent =()=>{
      // Fetch from backend
          fetch(backendUrl + `/api/student/list/${id}`)
              .then((res) => res.json())
              .then((data) => {
                  if (data.success) {
                      setCoursedetails(data.data.studentCourseDetails); // store only "data" array
                      setRecords(data.data)
                      setStudid(id)
          
                      
                  }
              })
              .catch((err) => console.error(err));
  }
       
  useEffect(() => {
        getStudent();
      }, []);

      
      
    
  
     
  // console.log('Student Name--->',) ;
  

// / console.log("Result---",courseId);

  const handleDeleteCourse =  (courseId)=>{
      
        if (window.confirm("Are you sure you want to delete this course?")) {
      Axios.delete(backendUrl + `/api/student/${studid}/course/${courseId}`)
        .then((res) => {
          toast.success("Course deleted");
          console.log(res.data.updatedCourse);
          getStudent();
        })
        .catch((err) => console.error(err));
    }             
      }



  return (
      <div>
      <Navbar/>
      
      <div className='flex mt-5'>
      
      <Sidebar/> 
    <form className='m-5 w-full mt-15 '>
      <div className='flex justify-between p-3'>
        <p className='mb-3 text-lg font-medium'>Student Details</p>
        <button onClick={() => navigate("/studentlist")} className=' cursor-pointer bg-black text-white  py-2 px-7 font-semibold rounded-full' > Go to Studentlist</button>
      </div>

      <div className='bg-white px-8 p-3 rounded w-full min-h-[80vh] ' >

        <div className='border p-5 rounded'  >
          <div>
            <img src={`http://localhost:4000/Uploads/${records.studentpic}` || logo } alt="not found" className='border rounded w-30 h-40' />
          </div>  

          <div className='flex mt-1 items-center'>
            <p className='-2 mr-1 w-35 font-bold '>Student ID</p>
            <p className='p-2'>:</p>
            <p className=' p-2'>{records.studid}</p>
          </div>

          <div className='flex items-center'>
            <p className='-2 mr-1 w-35 font-bold'>Student Name</p>
            <p className='p-2'>:</p>
            <p className=' p-2'>{records.name}</p>
          </div>

          <div className='flex items-center'>
            <p className='-2 mr-1 w-35 font-bold'>Email-Id</p>
            <p className='p-2'>:</p>
            <p className=' p-2'>{records.email}</p>
          </div>

          <div className='flex items-center'>
            <p className='-2 mr-1 w-35 font-bold'>Mobile No</p>
            <p className='p-2'>:</p>
            <p className=' p-2'>+91 {records.studentmobileno}</p>
          </div>

          <div className='flex items-center'>
            <p className='-2 mr-1 w-35 font-bold'>D.O.B</p>
            <p className='p-2'>:</p>
            <p className=' p-2'>{new Date(records.studentdob || "" ).toLocaleDateString()}</p>
          </div>

          <div className='flex items-center'>
            <p className='-2 mr-1 w-35 font-bold'>Gender</p>
            <p className='p-2'>:</p>
            <p className=' p-2'>{records.studentgender}</p>
          </div>

          <div className='flex items-center'>
            <p className='-2 mr-1 w-35 font-bold'>Education</p>
            <p className='p-2'>:</p>
            <p className=' p-2'>{(records.studenteducation)}</p>
          </div>

          <div className='flex items-center'>
            <p className='-2 mr-1 w-35 font-bold'>Blood Group</p>
            <p className='p-2'>:</p>
            <p className=' p-2'>{(records.studentbloodgroup)}</p>
          </div>

          <div className='flex items-center'>
            <p className='-2 mr-1 w-35 font-bold'>Address</p>
            <p className='p-2'>:</p>
            <p className=' p-2'>{(records.studentaddress)}</p>
          </div>


        </div>

        <div className='border mt-5 p-5'>

          <div className='flex justify-between mr-3' >
            <p className='-2 mr-1 mb-3 w-60 text-1xl font-bold border p-2'>Student's Course Details</p>
            <button className='bg-green-600 text-white p-2 px-6 m-2  rounded-full '  onClick={() => navigate(`/studentlist/addcoursetostudent/${records._id}`)} >Add Course</button>
          </div>


         { coursedetails && coursedetails.map((data, index) => (
            
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

                <div className='flex'>
                  <button className='bg-blue-600 text-white p-1 px-5  m-2  rounded-full ' onClick={() => navigate(`/studentlist/coursedetails/${id}/details/${data._id}`)} >View</button>                  
                  <input type="button" value={"Delete"}  onClick={()=>handleDeleteCourse(data._id)}  className='bg-red-600 text-white p-1 px-5  m-2  rounded-full' />
                            
                </div>

              </div>
            
          ))}

          
          

        </div> 

      </div>
    </form>
    </div>
    </div>
  )
}

export default ViewStudent

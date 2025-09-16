import React, { useContext, useEffect, useState } from 'react'
import Axios from 'axios'
import earn from '../assets/earnings.png'
import courses from '../assets/d-course.png'
import students from '../assets/students.png'
import history from '../assets/history.png'
import man from '../assets/man.png'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { ApiContext } from '../Context/ApiContext'


const Dashboard = () => {

  const {backendUrl}=useContext(ApiContext)
  
  
  const [student,setStudent]=useState([])
  const [course,setCourse]=useState([])
  const [payment,setPayment]=useState([])

    useEffect(() => {
      // Fetch courses when component loads
      Axios.get(backendUrl +"/api/course/list") // 
        .then((response) => {
          setCourse(response.data.data); //
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);


    useEffect(() => {
      // Fetch courses when component loads
      Axios.get(backendUrl + "/api/student/list") // 
        .then((response) => {
          setStudent(response.data.data); //
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);

     useEffect(() => {
      // Fetch courses when component loads
      Axios.get("http://localhost:4000/api/payment/list") // 
        .then((response) => {
          setPayment(response.data.data); //
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);

    const totalEarning = payment.reduce((sum, value)=> {
    return sum + value.paidAmount},0)


    // console.log("Payment Data :", payment);
    
  



  return (
    <div>
      <Navbar/>
      
      <div className='flex mt-5'>
      
      <Sidebar/>    
    <div className='mt-15' >

      <div className='flex justify-between w-4xl m-3 p-3'>

        <div className='border rounded w-65 flex items-center p-2  py-3 px-2'>
          <img src={earn} className='w-15 mr-3' alt="" />
          <p className='font-medium'> &#8377; {totalEarning} <br /> Earnings</p>
        </div>

        <div className='border rounded w-65 flex items-center p-2 py-3 px-2'>
          <img src={courses} className='w-15 mr-3' alt="" />
          <p className='font-medium'>{course.length} + <br /> Courses Available</p>
        </div>


        <div className='border rounded w-65 flex items-center p-2  py-3 px-2 '>
          <img src={students} className='w-16 mr-3' alt="" />
          <p className='font-medium'> {student.length} + <br /> Students</p>
        </div>

      </div>

      <div className='border rounded flex flex-col items-start py-0 m-6'>

        <div className='flex items-center border-b-3 w-full px-0 '>
          <img src={history} className='w-13 p-2'  alt="" />
          <p className='font-semibold '>Latest Payments..</p>
        </div>

        <div className='flex flex-col w-full'>                

          <table className="table-auto w-full">    
            <tbody>
              {payment.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt) )
              .map((record, index) => (
                <tr key={index} className=' hover:bg-gray-200 ' >
                  <td className="border-b p-2 text-center items-center"><img src={man} className='w-10 p-2 ' alt="" /></td>
                  <td className="border-b p-2 text-center">{record._id}</td>
                  <td className="border-b p-2 text-center">{new Date(record.createdAt).toDateString()} </td>
                  <td className="border-b p-2">{record.studentname}</td>
                  <td className="border-b p-2">{record.courseName}</td>
                  <td className="border-b p-2 text-center"> &#8377; {record.paidAmount}</td>                  
                </tr>
              ))}                
            </tbody>
          </table>
             

          {/* <div className='flex justify-between items-center'>
            <img src={earn} className='w-15' alt="" />
            <p>23-08-25</p>
            <p>D24200757</p>
            <p>Praveen Kumar</p>
            <p>Mern Stack</p>
            <p>$3500</p>
          </div>

          <div className='flex justify-between items-center'>
            <img src={earn} className='w-15' alt="" />
            <p>23-08-25</p>
            <p>D24200757</p>
            <p>Praveen Kumar</p>
            <p>Mern Stack</p>
            <p>$3500</p>
          </div>

          <div className='flex justify-around items-center'>
            <img src={earn} className='w-15' alt="" />
            <p>23-08-25</p>
            <p>D24200757</p>
            <p> Prince</p>
            <p>Mern Stack</p>
            <p>$3500</p>
          </div> */}

         

        </div>

      </div>

    </div>
    </div>
    </div>
  )
}

export default Dashboard
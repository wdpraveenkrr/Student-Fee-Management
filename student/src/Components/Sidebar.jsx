import React, { useContext, useEffect, useState } from 'react'
import Axios from 'axios'
import home from '../assets/home.png'
import man from '../assets/man.png'
import pay from '../assets/payment.png'
import add from '../assets/add.png'
import report from '../assets/report.png'
import courses from '../assets/student.png'

import { NavLink } from 'react-router-dom'
import { AppContent } from '../context/AppContext'



const Sidebar = () => {


  const [open, setOpen] = useState(false)

  const { userData } = useContext(AppContent)



  const [student, setStudent] = useState([])
  const [course, setCourse] = useState([])
  const [payment, setPayment] = useState([])

  useEffect(() => {
    // Fetch courses when component loads
    Axios.get("http://localhost:4000/api/course/list") // 
      .then((response) => {
        setCourse(response.data.data); //
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  
  useEffect(() => {
    // Fetch courses when component loads

    

    

    Axios.get("http://localhost:4000/api/student/list") // 
      .then((response) => {
        setStudent(response.data.data); //
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });

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

  const totalEarning = payment.reduce((sum, value) => {
    return sum + value.paidAmount
  }, 0)


  return (

    <div className=''>

     
       
        <div className='min-h-screen bg-white border-r'>


          <NavLink to={'/dashboard'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer   ${isActive ? 'bg-blue-300  border-r-5 border-blue-600' : ''}   `}     >
            <img src={home} className='w-5' alt="" />
            Dashboard
          </NavLink>

          <NavLink to={'/profile'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-300  border-r-5 border-blue-600' : ''}   `}       >
            <img src={man} className='w-5' alt="" />
            Profile
          </NavLink>

          <NavLink to={'/my-course'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-300  border-r-5 border-blue-600' : ''}   `}       >
            <img src={courses} className='w-5' alt="" />
            My Course
          </NavLink>

          <NavLink to={'/add-payment'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-300  border-r-5 border-blue-600' : ''}   `}     >
            <img src={add} className='w-5' alt="" />
            Pay Fee
          </NavLink>

          <NavLink to={'/payment-list'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-300  border-r-5 border-blue-600' : ''}   `}     >
            <img src={pay} className='w-5' alt="" />
            PaymentList
          </NavLink>

          <NavLink to={'/feedback'} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-blue-300  border-r-5 border-blue-600' : ''}   `}    >
            <img src={report} className='w-5' alt="" />
            Feedback
          </NavLink>

        </div>

  




    </div>
  )
}

export default Sidebar
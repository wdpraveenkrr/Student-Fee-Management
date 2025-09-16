import React from 'react'
import { NavLink } from 'react-router-dom'
import home from '../assets/home.png'
import student from '../assets/student.png'
import course from '../assets/learning.png'
import payment from '../assets/payment.png'
import add from '../assets/add.png'
import report from '../assets/report.png'


const Sidebar = () => {
  return (
    <div className='min-h-screen bg-white border-r mt-15'>
        <NavLink to={'/dashboard'} className={({isActive})=>`flex items-center gap-3 py-2.5 px-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-blue-300  border-r-5 border-blue-600': ''}   `}     >
            <img src={home} className='w-5' alt="" />
            <p>Dashboard</p>
        </NavLink>
        
        <NavLink to={'/add-student'} className={({isActive})=>`flex items-center gap-3 py-2.5 px-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-blue-300  border-r-5 border-blue-600': ''}   `}       >
              <img src={add} className='w-5' alt="" />
            <p>Add Student</p>
        </NavLink>

        <NavLink to={'/studentlist'}  className={({isActive})=>`flex items-center gap-3 py-2.5 px-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-blue-300  border-r-5 border-blue-600': ''}   `}      >
              <img src={student} className='w-5' alt="" />
            <p>StudentList</p>
        </NavLink>

        <NavLink to={'/add-course'} className={({isActive})=>`flex items-center gap-3 py-2.5 px-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-blue-300  border-r-5 border-blue-600': ''}   `}       >
              <img src={add} className='w-5' alt="" />
            <p>Add Course</p>
        </NavLink>

        <NavLink to={'/courselist'} className={({isActive})=>`flex items-center gap-3 py-2.5 px-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-blue-300  border-r-5 border-blue-600': ''}   `}       >
             <img src={course} className='w-5' alt="" />
            <p>CourseList</p>
        </NavLink>

        <NavLink to={'/add-payment'}   className={({isActive})=>`flex items-center gap-3 py-2.5 px-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-blue-300  border-r-5 border-blue-600': ''}   `}     >
              <img src={add} className='w-5' alt="" />
            <p>Add Payment</p>
        </NavLink>

        <NavLink to={'/paymentlist'}   className={({isActive})=>`flex items-center gap-3 py-2.5 px-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-blue-300  border-r-5 border-blue-600': ''}   `}     >
               <img src={payment} className='w-5' alt="" />
            <p>PaymentList</p>
        </NavLink>

        <NavLink to={'/reports'}    className={({isActive})=>`flex items-center gap-3 py-2.5 px-3 md:px-9 md:min-w-60 cursor-pointer ${isActive ? 'bg-blue-300  border-r-5 border-blue-600': ''}   `}    >
               <img src={report} className='w-5' alt="" />
            <p>Reports</p>
        </NavLink>

    </div>
  )
}

export default Sidebar
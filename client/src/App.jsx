  import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from './Components/Navbar'
import StudentList from './Pages/StudentList.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import CourseList from './Pages/CourseList.jsx'
import PaymentList from './Pages/PaymentList.jsx'
import Sidebar from './Components/Sidebar.jsx'
import Reports from './Pages/Reports.jsx'
import AddStudent from './Pages/AddStudent.jsx'
import AddCourse from './Pages/AddCourse.jsx'
import AddPayment from './Pages/AddPayment.jsx'
import ViewCourse from './Pages/ViewCourse.jsx';
import EditCourse from './Pages/EditCourse.jsx';
import ViewStudent from './Pages/ViewStudent.jsx';
import EditStudent from './Pages/EditStudent.jsx';
import AddCourseStudent from './Pages/AddCourseStudent.jsx';
import StdCouresFeeDetails from './Pages/StdCouresFeeDetails.jsx';
import Success from './Pages/Success.jsx';
import Login from './Pages/Login.jsx';
import ResetPassword from './Pages/ResetPassword.jsx';
import Home from './Pages/Home.jsx';



const App = () => {






  return (
    <div className=''>
 
        {/* <Navbar/> */}
       <ToastContainer position="top-right" autoClose={3000} /> 
       
        {/* <Sidebar/>     */}
        <Routes>
          <Route path='/' element={<Login/>}  />    
          <Route path='/home' element={<Home/>}  /> 
          <Route path='/reset-password' element={<ResetPassword/>}  />    
                                
          <Route path='/dashboard' element={<Dashboard/>}  />
          <Route path='/studentlist' element={<StudentList/>}  />
          <Route path='/courselist' element={<CourseList/>}  />
          <Route path='/paymentlist' element={<PaymentList/>}  />
          <Route path='/add-student' element={<AddStudent/>}  />
          <Route path='/add-course' element={<AddCourse/>}  />
          <Route path='/add-payment' element={<AddPayment/>}  />
          <Route path='/reports' element={<Reports/>}  />

          <Route path='/success' element={<Success/>} />
          

          <Route path="/courselist/view/:id" element={<ViewCourse/>}  />
          <Route path="/courselist/edit/:id" element={<EditCourse/>}  />

          <Route path="/studentlist/view/:id" element={<ViewStudent/>}  />
          <Route path="/studentlist/edit/:id" element={<EditStudent/>}  />
          <Route path="/studentlist/addcoursetostudent/:id" element={<AddCourseStudent/>}  />
          <Route path="/studentlist/coursedetails/:id/details/:id" element={<StdCouresFeeDetails/>}  />                  
          
        </Routes>
     
    </div>
  )
}

export default App
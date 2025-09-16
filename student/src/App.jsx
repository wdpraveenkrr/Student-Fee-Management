import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Login'
import EmailVerify from './Pages/EmailVerify'
import ResetPassword from './Pages/ResetPassword'
import { ToastContainer } from 'react-toastify'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Profile from './Pages/Profile'
import Payfee from './Pages/Payfee'
import Successpage from './Pages/Successpage'
import Paymentlist from './Pages/Paymentlist'
import Mycourse from './Pages/Mycourse'
import ViewCourse from './Pages/ViewCourse'
import Feedback from './Pages/Feedback'
import UpdateProfile from './Pages/UpdateProfile'

const App = () => {
  return (
    <div>
      <ToastContainer/>
                  
      <Routes>
        <Route path='/'  element={<Login/>}/>
        <Route path='/home'  element={<Home/>}/>              
        <Route path='/dashboard'  element={<Dashboard/>}/>        
        <Route path='/verify-email'  element={<EmailVerify/>}/>
        <Route path='/reset-password'  element={<ResetPassword/>}/>
        <Route path='/success'  element={<Successpage/>}/>
        <Route path='/feedback'  element={<Feedback/>}/>
        

        <Route path='/profile'  element={<Profile/>}/>
        <Route path='/update-profile/:id'  element={<UpdateProfile/>}/>
        <Route path='/add-payment'  element={<Payfee/>}/>
        <Route path='/payment-list'  element={<Paymentlist/>}/>
        <Route path='/my-course'  element={<Mycourse/>}/>
        <Route path='/my-course/:id/details/:id'  element={<ViewCourse/>}/>     

        

      </Routes>
      
    </div>
  )
}

export default App
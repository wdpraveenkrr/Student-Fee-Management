import React, { useContext, useEffect, useState } from 'react'
import Axios from 'axios'
import earn from '../assets/earnings.png'
import history from '../assets/history.png'
import man from '../assets/man.png'
import Navbar from '../Components/Navbar'
import Header from './Header'
import { AppContent } from '../context/AppContext'


const Dashboard = () => {


  const {userData, backendUrl}=useContext(AppContent) 
  
  const id = userData.studentid
  
  
  

  const [payment,setPayment]=useState([])
  const[records,setRecords]=useState([])

   


    useEffect(() => {
      // Fetch courses when component loads
      Axios.get(backendUrl + `/api/student/list/${id}`) // 
        .then((response) => {
          
          setRecords(response.data.data.studentCourseDetails)
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);

     useEffect(() => {
      // Fetch courses when component loads
      Axios.get(backendUrl + "/api/payment/list") // 
        .then((response) => {
          setPayment(response.data.data); //
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
    
    
  
  
    const courseAmount = records.reduce((acc, item) =>  acc + item.coursefee, 0) 
   

  const totalpaid = payment.filter((item) => {
                return item.studentId === id ? item.items : ""
              }).reduce((sum, value) => {
        return sum + value.paidAmount
    }, 0)
    
           
              


  return (
    <div className='flex items-start'>
        <Navbar/>
        <Header/>                       

    <div className='mt-10 w-5xl m-5  ' >       

      <div className='flex justify-between  m-3 p-3'>

        <div className='border rounded w-65 flex items-center p-2  py-3 px-2'>
          <img src={earn} className='w-15 mr-3' alt="" />
          <p className='font-medium'> &#8377; {courseAmount} <br /> Total Course Amount</p>
        </div>

        <div className='border rounded w-65 flex items-center p-2 py-3 px-2'>
          <img src={earn} className='w-15 mr-3' alt="" />
          <p className='font-medium'> &#8377; {totalpaid} <br /> Paid Amount</p>
        </div>


        <div className='border rounded w-65 flex items-center p-2  py-3 px-2 '>
          <img src={earn} className='w-16 mr-3' alt="" />
          <p className='font-medium'>&#8377; { courseAmount - totalpaid }   <br /> Balance</p>
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
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt) ).filter((item) => {
                return item.studentId === id ? item : ""
              })
              .map((record, index) => (
                <tr key={index} className=' hover:bg-gray-200 ' >
                  <td className="border-b p-2 text-center items-center"><img src={man} className='w-10 p-2 ' alt="" /></td>
                  <td className="border-b p-2 text-center">{record._id}</td>
                  <td className="border-b p-2 text-center">{new Date(record.createdAt).toDateString()} </td>                  
                  <td className="border-b p-2">{record.courseName}</td>
                  <td className="border-b p-2 text-center"> &#8377; {record.paidAmount}</td>                  
                </tr>
              ))}                
            </tbody>
          </table>
             
             


      </div>

    </div>

    </div> 

    </div>
  )
}

export default Dashboard
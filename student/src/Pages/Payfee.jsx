import React, { useContext, useEffect, useMemo, useState } from 'react'
import Axios from 'axios'
import { data, useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import Navbar from '../Components/Navbar';
import Header from './Header';
import { AppContent } from '../context/AppContext';

const Payfee = () => {

  const {userData, backendUrl} = useContext(AppContent)


  const [id, setId]=useState('')


          

  const navigate = useNavigate();
  
  const [courseId, setCourseId] = useState("")
  const [paidAmount, setPaidAmount] = useState(0)  
  const [name, setName] = useState("")
  const [studentDetail, setStudentDetail] = useState([])

  

  const handleCourseNameChange = (e) => {
    setCourseId(e.target.value)
    
  }

  // console.log("course Id", courseId);
  


  const [stdId, setStdId] = useState("")



  useEffect(() => {
    // Fetch from backend

    const data = userData ? userData.studentid : ""

          setId(data)

    fetch(backendUrl + `/api/student/list/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setName(data.data.name)
          setStdId(data.data.studid)
          setStudentDetail(data.data.studentCourseDetails); // store only "data" array
          // console.log(data.data.studentCourseDetails);

        }
      })
      .catch((err) => console.error(err));
  });



  // console.log("Course Details-->", studentDetail);

const course = studentDetail?.find(item => item._id === courseId);
const courseName = course ? course.coursename : "";


  // console.log("Course Name-->", courseName);
  






  // console.log("Array-->", orderitem);


  const checkout = async (e) => {
    e.preventDefault();

    if (paidAmount > 500) {



      let orderitem = [{ quantity: 1, price: paidAmount, name: courseName }]
      let orderData = {
        studid: id, sid: stdId, items: orderitem, sname: name, cid: courseId, cname: courseName, price: paidAmount
      }

      Axios.post(backendUrl + "/api/payment/add-payment", orderData)

        .then((response) => {
          // console.log("Result", response.data.url);
          // const {session_url} = response
          window.location.replace(response.data.url)
          // navigate('/dashboard')
          // navigate(`/${session_url}`, { replace: true });
        })



    }
    else {
      alert("Enter valid Amount or minimum payment is 500 ")
    }
  }

  const handleReset =()=>{
    setPaidAmount("")    
  }


  return (

    <div className='flex items-start'>
      <Navbar />
      <Header />

      <form className='m-5 mt-20 ' onSubmit={checkout}>

        <p className='mb-3 text-lg font-medium'>Add Payment</p>

        <div className='bg-white px-8 border rounded w-full max-w-4xl max-h-[80vh]' >

          <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600 mt-3'>
            <div className='w-full lg:flex-1 flex flex-col gap-4 ' >



              <div className='flex-1 flex flex-col gap-1'>
                <p>Student's CourseList</p>

                <select name="courselist" id="courselist" onChange={handleCourseNameChange} className='border rounded px-3 py-1'>
                  <option value="">-- Select Course --</option>
                  {studentDetail && studentDetail.map((record) => (
                    <option value={record._id}>{record.coursename}</option>
                  ))}
                </select>

              </div>
             
              <div className='flex-1 flex flex-col gap-1'>
                <p>Payable Amount</p>
                <input type="number" value={paidAmount} name="paidAmount" required onChange={(e) => setPaidAmount(e.target.value)} placeholder='Enter Amount here ( minium : 500)' maxLength={5} className='border rounded px-3 py-1' />
              </div>


            </div>


          </div>

          <button className='bg-blue-500 text-white px-8 py-1.5 rounded-full m-3 mt-5 mb-5 ' type='submit' >Pay Now</button>
          <button className='bg-black text-white px-8 py-1.5 rounded-full m-3' onClick={handleReset} >Cancel</button>
        </div>

      </form>

    </div>
  )
}

export default Payfee 
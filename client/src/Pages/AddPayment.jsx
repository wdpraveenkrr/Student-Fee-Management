import React, { useContext, useEffect, useMemo, useState } from 'react'
import Axios from 'axios'
import { data, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import { ApiContext } from '../Context/ApiContext';

const AddPayment = () => {

  const {backendUrl}=useContext(ApiContext)


  const navigate = useNavigate();
  const [records, setRecords] = useState([])
  const [studid, setStudid] = useState("")
  const [courseId, setCourseId] = useState("")
  const [courseName, setCourseName] = useState("")
  const [paidAmount, setPaidAmount] = useState(0)
  const [selectedId, setSelectedId] = useState("");  
  const [name, setName] = useState("")
  const [studentDetail, setStudentDetail] = useState("")

  useEffect(() => {
    // Fetch from backend
    fetch(backendUrl + "/api/student/list")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRecords(data.data); // store only "data" array
          // console.log(data.data);

        }
      })
      .catch((err) => console.error(err));
  },[]);


   const handleCourseNameChange = (e) => {
    setCourseId(e.target.value)
  }

  

  const [stdId,setStdId]=useState("")

  

  useEffect(() => {
    // Fetch from backend
    fetch(backendUrl + `/api/student/list/${selectedId}`)
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
  }, [selectedId]);



  // console.log("Course Details-->", studentDetail);


 

 
  useEffect(() => {
        fetch(backendUrl + `/api/student/${selectedId}/course/${courseId}/details`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // setCoursedetails(data.data)
          setCourseName(data.data.coursename)
          // console.log("Course Details--->", data.data);

        }
      })
      .catch((err) => console.error(err));
  });


    const handleChange = (e) => { 
    setStudid(e.target.value)
    setSelectedId(e.target.value); // 👈 value will be _id
  }
// const loc = window.location.href
// console.log("location-->", loc);


  // console.log("Student Id--->", studid);
  // console.log("StdId--->", stdId);
  // console.log("Student Name--->", name);
  // console.log("Course Id --->", courseId);
  // console.log("Course Name --->", courseName);
  // console.log("Paid Amount--->", paidAmount);

  // console.log("Paid Date--->", new Date());

  let orderitem = [{ quantity:1, price:paidAmount, name: courseName}]

  // console.log("Array-->", orderitem);

  

  const checkout = async (e) => {
    e.preventDefault();

    if(paidAmount > 500 ){   

   

      let orderitem = [{ quantity:1, price:paidAmount, name: courseName}]
      let orderData ={
        studid : studid, sid : stdId ,items : orderitem, sname : name ,cid : courseId, cname  : courseName, price : paidAmount  }

      Axios.post(backendUrl + "/api/payment/add-payment",orderData)
      
      .then((response)=>{
        // console.log("Result",response.data.url);        
        // const {session_url} = response
        window.location.replace(response.data.url)
        // navigate(`/${session_url}`, { replace: true });
      })  

    
            
            
    
    }
    else{
      alert("Enter valid Amount or minimum payment is 500 ")
    }
  }




  return (
      <div>
          <Navbar/>          
          <div className='flex mt-5'>          
          <Sidebar/> 
    <form className='m-5 w-4xl mt-15' onSubmit={checkout}>
      <p className='mb-3 text-lg font-medium'>Add Payment</p>

      <div className='bg-white px-8 border rounded w-150 overflow-y-scroll' >

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600 mt-3 '>
          <div className='lg:flex-1 flex flex-col gap-4 ' >

            <div className='flex-1 flex flex-col gap-1'>
              <p>Student Id</p>
              <select name="sudentid" id="studid" onChange={handleChange} value={selectedId || ""} className='border rounded px-3 py-1'>
                <option value="">Select Student Id</option>
                {records?.length > 0 && records.map((record) => (
                   <option key={record._id} value={record._id}>{record.studid}</option>              
                   ))} 
              </select>
            </div>

               

            <div className='flex-1 flex flex-col gap-1'>
              <p>Student Name</p>
              <input type="text" value={name || "" } placeholder='Student Name' name='name' disabled className='border rounded px-3 py-1' />
            </div>


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
              <input type="number" value={paidAmount || "" } name="paidAmount" required onChange={(e) => setPaidAmount(e.target.value)} placeholder='Enter Amount here' maxLength={5} className='border rounded px-3 py-1' />
            </div>


          </div>


        </div>

        <button className='bg-blue-500 text-white px-8 py-2 rounded m-3 mt-5 mb-5 ' type='submit' >Pay Now</button>
        <button className='bg-black text-white px-8 py-2 rounded m-3' onClick={() => navigate("/studentlist")} >Cancel</button>
      </div>

    </form>
    </div>
    </div>

  )
}

export default AddPayment 
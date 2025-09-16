import React, { useContext, useEffect, useState } from 'react'
import { data, useNavigate } from 'react-router-dom';
import email from '../assets/email.png'
import phone from '../assets/phone.png'
import { toast } from "react-toastify";
import Axios from 'axios'
import logo from '../assets/logo.png'
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import { ApiContext } from '../Context/ApiContext';

const StudentList = () => {

  const {backendUrl}=useContext(ApiContext)

  const navigate = useNavigate()

  const [records, setRecords] = useState([])
  const [search, setSearch] =useState("")

  useEffect(() => {
     // Fetch from backend
     fetch(backendUrl + "/api/student/list")
       .then((res) => res.json())
       .then((data) => {
         if (data.success) {
           setRecords(data.data); // store only "data" array
          //  console.log(data.data);
           
         }
       })
       .catch((err) => console.error(err));
   }, []);
 
   const HandleCourseDelete = async (e) => {
       console.log("Delete Id", e);
   
       const confirmDelete = window.confirm("Are you sure you want to delete?");
       if (confirmDelete) {
         const { data } = await Axios.delete(backendUrl + `/api/student/remove/${e}`)
   
         if (data.success) {
           console.log(data.message);
           setTimeout(()=>{
           toast.success("Student Deleted")}, 5)
           navigate("/studentlist")
           window.location.reload()
          
           
         }
         else {
           console.log(data.message);
         }
       }}
       

  return (

      <div>
          <Navbar/>          
          <div className='flex mt-5'>          
          <Sidebar/> 
    <div className='mt-15' >
      <div className='flex w-5xl items-center justify-between m-3 p-2 rounded'>
        <p className='text-2xl font-medium'>Student List</p>
        <p className='font-medium'>Search <input type="text" className='border p-1 px-2 rounded'  onChange={(e) => setSearch(e.target.value)} /></p>
      </div>

      <div className='ml-5 mt-5'>
        <table className='border flex-col items-center text-center table-auto border-collapse  w-5xl'>
          <thead className='bg-blue-300'>
            <tr style={{ height: '40px' }}>
              <th>#</th>
              <th>Photo</th>
              <th>Student Id / Name</th>              
              <th>Contact</th>
              <th>Action / Add Course</th>
            </tr>
          </thead>
          <tbody>
            {records.filter((item) => {
                return search.toLowerCase() === "" ? item :
                  item.name.toLowerCase().includes(search.toLowerCase()) ||                  
                  item.email.toLowerCase().includes(search.toLowerCase()) || 
                  item.studentmobileno.toString().includes(search) ||
                  item.studid.toString().includes(search)
              }).map((record, index) => (
              <tr key={index} style={{ height: '60px', borderBottom: "3px solid black" }}>
                <td className='p-3'>{index + 1}</td>
                <td><img src={`http://localhost:4000/Uploads/${record.studentpic}` || logo } alt="" width={70} height={30}  className='m-3 border rounded items-center' /></td>
               <td>
                <p>{record.studid}</p>
                <p>{record.name}</p>
                </td>                
                <td ><p className='flex items-center' > <img src={email}  className='w-5 m-2' alt="" /> {record.email}</p><p className='flex items-center'> <img src={phone} className='w-5 m-2'   alt="" /> {record.studentmobileno}</p></td>
                <td>
                  <button className='bg-green-600 text-white rounded px-5 py-1 m-2' onClick={()=>navigate(`/studentlist/addcoursetostudent/${record._id}`)} >Add</button>
                  <button className='bg-green-600 text-white rounded px-5 py-1 m-2' onClick={()=>navigate(`/studentlist/view/${record._id}`)}  >View</button>
                  <button className='bg-blue-600 text-white rounded px-5 py-1 m-2'  onClick={()=>navigate(`/studentlist/edit/${record._id}`)}  >Edit</button>
                  <button className='bg-red-600 text-white rounded px-5 py-1 m-2' onClick={() => HandleCourseDelete(record._id)}  >Delete</button>
                </td>
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

export default StudentList
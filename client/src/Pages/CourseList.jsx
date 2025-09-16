import React, { useContext } from 'react'
import Axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import { ApiContext } from '../Context/ApiContext';

const CourseList = () => {

  const {backendUrl}=useContext(ApiContext)

  const [records, setRecords] = useState([])
  const navigate = useNavigate();

  
   useEffect(() => {  
    // Fetch courses when component loads
    Axios.get(backendUrl + "/api/course/list") // 
      .then((response) => {
        setRecords(response.data.data); //
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  // console.log(records);
  // console.log(records.cname);

  



  const HandleCourseDelete = async (e) => {
    console.log("Delete Id", e);

    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      const { data } = await Axios.delete(backendUrl + `/api/course/remove/${e}`)

      if (data.success) {
        console.log(data.message);
        setTimeout(()=>{
        toast.success("Course Deleted")}, 5)
        
        window.location.reload();
      }
      else {
        console.log(data.message);
      }
    }}

    
      const [search, setSearch] =useState("")





  return (
      <div>
          <Navbar/>          
          <div className='flex mt-5'>          
          <Sidebar/> 
    <div className='mt-15'>
      <div className='flex items-center justify-between m-3 p-2 rounded w-4xl'>
        <p className='text-2xl font-medium'>Course List</p>
        <p className='font-medium'>Search <input type="text" className='border p-1 px-2 rounded'  onChange={(e) => setSearch(e.target.value)} /></p>
      </div>

      <div className='ml-5 mt-5 '>
        <table className='border flex-col items-center text-center w-full'>
          <thead className='bg-blue-400'>
            <tr className='text-start h-10'>
              <th>#</th>
              <th className='text-start'>Course Name</th>
              <th className='text-start'>Course Fee</th>
              <th>Course Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className=' border' >
            {records.filter((item) => {
                            return search.toLowerCase() === "" ? item :
                              item.cname.toLowerCase().includes(search.toLowerCase()) ||                                                                            
                              item.cduration.toString().includes(search) ||                             
                              item.cfee.toString().includes(search)
                          }).map((record, index) => (

              <tr className='h-15 border-b-2' key={index}  >
                <td className='p-2'>{index + 1}</td>                
                <td className='text-start'>{record.cname}</td>
                <td>Rs. {record.cfee}/-</td>
                <td>{record.cduration} Months</td>
                <td>
                  <button className='bg-green-600 text-white py-1 cursor-pointer px-6 m-2 rounded text-center' onClick={() => navigate(`/courselist/view/${record._id}`)}  >View</button>
                  <button className='bg-blue-600 text-white py-1 cursor-pointer px-6 m-2 rounded' onClick={() => navigate(`/courselist/edit/${record._id}`)} >Edit</button>
                  <button className='bg-red-600 text-white py-1 cursor-pointer px-6 m-2 rounded' onClick={() => HandleCourseDelete(record._id)}  >Delete</button>
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

export default CourseList
import React, { useContext, useEffect, useState } from 'react'
import Axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import { ApiContext } from '../Context/ApiContext';

const AddCourseStudent = () => {

  const {backerdUrl}=useContext(ApiContext)

  const navigate = useNavigate()

  const [records, setRecords] = useState("")


  
  const { id } = useParams();

  useEffect(() => {
    // Fetch from backend
    fetch(backerdUrl + `/api/student/list/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRecords(data.data); // store only "data" array
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // console.log(records);

  const [data, setData] = useState("")


  useEffect(() => {
    // Fetch from backend
    fetch(backerdUrl +'/api/course/list/')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.data); // store only "data" array
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // console.log("Courselist--->", data);



  const [selectedId, setSelectedId] = useState("");
  const [coursename, setCoursename] = useState("")
  const [courseduration, setCourseduration] = useState("")
  const [coursefee, setCoursefee] = useState("")

  

  const handleChange =(e) => {
    setSelectedId(e.target.value); // 👈 value will be _id

  }


  // console.log(selectedId);

  const [courseData, setCourseData] = useState("")

  useEffect(() => {
    // Fetch from backend
    fetch(backerdUrl + `/course/list/${selectedId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
           setCourseData(data.data);
           setCoursename(data.data.cname);
           setCourseduration(data.data.cduration)
           setCoursefee(data.data.cfee)

          // store only "data" array
        }
      })
      .catch((err) => console.error(err));
  }, [selectedId]);


  
console.log("Course Name--->", coursename);



  // console.log("Hints---->", courseData.cname); 




  

  // console.log("Duration ----->",courseduration);
  


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      
      const formData = new FormData();

      formData.append("coursename", coursename)
      formData.append("courseduration", courseduration)
      formData.append("coursefee", coursefee)

      formData.forEach((value, key) => {
        console.log(`${key}`, value);
      })


      const { data } = await Axios.put(backerdUrl + `/api/student/addnew/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",  // tells server you are sending JSON
          "Authorization": "Bearer yourTokenHere", // if you use JWT token
          "Custom-Header": "value123",          // any custom header     }
        }
      })
        .then((data) => {
          console.log(data.data); //
          toast.success("Student Details Updated");
          navigate("/studentlist")

        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });


    } catch (error) {

    }
  }


  return (
      <div>
          <Navbar/>          
          <div className='flex mt-5'>          
          <Sidebar/> 
    <div className='m-5 w-4xl mt-15'>
      <div className='flex justify-between'>
        <p className='mb-3 text-lg font-medium'>Add Course to Student</p>
        <button className='bg-black text-white font-semibold  p-2 px-8 rounded-full mb-3' onClick={() => navigate("/studentlist")}>Go to Studentlist</button>

      </div>

      <form action="" onSubmit={onSubmitHandler} >

        <div className='bg-white px-8 border rounded w-150' >

          <div className='mt-5'>
            <div className='w-full lg:flex-1 flex flex-col gap-2'>

              <div className='flex-1 flex flex-col gap-1 '>
                <p>Student Id</p>
                <p className='border rounded px-3 py-1'>{records.studid}</p>
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Student Name</p>
                <p className='border rounded px-3 py-1'>{records.name}</p>
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Select Course</p>

                <select name="course" id="course" onChange={handleChange} value={selectedId} className='border rounded px-3 py-1'>
                  <option value="">-- Select Course --</option>
                  {data && data.map((dt) => (
                    <option key={dt._id} value={dt._id} >{dt.cname}</option>
                  ))}
                </select>
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Course Duration</p>
                <p className='border rounded px-3 py-1'>{courseData.cduration} Months</p>
              </div>

              <div className='flex-1 flex flex-col gap-1'>
                <p>Fee</p>
                <p className='border rounded px-3 py-1'>Rs.{courseData.cfee}/-</p>
              </div>


            </div>


          </div>

          <button className='bg-blue-500 text-white px-8 py-2 rounded-full m-3 mt-5 ' type='submit' >Add course</button>
          <button className='bg-black text-white px-8 py-2 rounded-full m-3 ' type='reset' onClick={() => setCourseData("")}  >Reset</button>
        </div>
      </form>
    </div>
    </div>
    </div>
  )
}

export default AddCourseStudent


import React from 'react'
import { toast } from "react-toastify";
import coursepic from '../assets/course-pic.png'
import { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import Axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../Components/Sidebar';
import { ApiContext } from '../Context/ApiContext';

const EditCourse = () => {

  const {backendUrl}=useContext(ApiContext)

  const navigate = useNavigate();


      const [cpic, setCpic] = useState(null)
      const [cname, setCname] = useState("")
      const [cfee, setCfee] = useState("")
      const [cduration, setCduration] = useState('')
      const [ctopics, setCtopics] = useState("")
      const [cdescription, setCdescription] = useState("")  

    const [records, setRecords]=useState("")
    const {id} = useParams();

    useEffect(() => {
      // Fetch from backend
      fetch(backendUrl + `/api/course/list/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setRecords(data.data); // store only "data" array
            setCname(data.data.cname)
            setCfee(data.data.cfee)
            setCduration(data.data.cduration)
            setCdescription(data.data.cdescription)
            setCtopics(data.data.ctopics)

          }
        })
        .catch((err) => console.error(err));
    }, []);
  
  
    const onSubmitHandler = async (e) => {
          e.preventDefault();

          try {
                               
          
                const formData = new FormData();
          
                formData.append("cname", cname)
                formData.append("cfee", cfee)
                formData.append("cduration", cduration)      
                formData.append("ctopics", ctopics)      
                formData.append("cdescription", cdescription)
          
                formData.forEach((value, key) => {
                  console.log(`${key}`, value);
                })
          
          
                const { data } = await Axios.put(backendUrl + `/api/course/update/${id}`, formData, {
                  headers: {
                    "Content-Type": "application/json",  // tells server you are sending JSON
                    "Authorization": "Bearer yourTokenHere", // if you use JWT token
                    "Custom-Header": "value123",          // any custom header     }
                }})
                .then((data) => {
                console.log(data.data); //
                toast.success("Course Updated"); 
                navigate("/courselist")

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
    <div className='flex flex-col w-4xl mt-15' >
    <div className='flex justify-between p-3'>
      <p className='mb-3 text-lg font-medium'>Update Course Details</p>
      <button onClick={()=>navigate("/courselist")} className=' cursor-pointer bg-black text-white  py-2 px-7 font-semibold rounded-full' > Go to Courselist</button>
      </div>
   
    <form onSubmit={onSubmitHandler}  className='ml-5  w-full mb-5' >
      

      <div className='bg-white px-8 rounded w-full min-h-[80vh] ' >

              <div className=''  >
            

              <div className='flex mt-5 items-center'>
                <p className='p-2  mr-1 w-35 font-bold '>Course Name</p>
                <p className='p-2'>:</p>
                <input type="text" className=' p-2 border rounded w-60'  value={cname} onChange={(e)=>setCname(e.target.value)}/>
                </div>

              <div className='flex mt-2 items-center'>
                <p className='p-2 mr-1 w-35 font-bold'>Course Fee</p>
                <p className='p-2'>:</p>                
                <input type="text" className='p-2 border rounded w-60'  value={cfee} onChange={(e)=>setCfee(e.target.value)} />             
              </div>

              <div className='flex mt-2 items-center'>
                <p className='p-2 mr-1 w-35 font-bold'>Course Duration</p>
                <p className='p-2'>:</p>
                <input type="number" className='p-2 border rounded w-60' value={cduration} onChange={(e)=>setCduration(e.target.value)} />                
              </div>

              <div className='items-center mt-2 '>

                <p className='-2 mr-1 w-45 font-bold'>Course Description</p>
                <textarea className=' mt-2 overflow-y-hidden flex text-justify p-2 border w-full min-h-40 '  value={cdescription} onChange={(e)=>setCdescription(e.target.value)} > </textarea>
                    
                
                <p className='-2 mr-1 w-45 font-bold'>Key Topics</p>
                <textarea className=' mt-2 overflow-y-hidden flex text-justify p-2 border w-full min-h-40 '  value={ctopics} onChange={(e)=>setCtopics(e.target.value)} > </textarea>
                                
              </div>       

                <div className='items-center mt-3 w-70 flex justify-between' >
                <button className='bg-blue-500 px-8 py-2 text-white rounded-full' type='submit' >Update</button>                 
               </div>    

          

            </div>

             
      </div>
    </form>
     </div>
     </div>
     </div>
  )
}

export default EditCourse

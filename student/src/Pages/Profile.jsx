import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import Header from './Header';
import { AppContent } from '../context/AppContext';


const Profile = () => {

    const navigate = useNavigate();

    const {userData , backendUrl, uploadPath} = useContext(AppContent)

    const id = userData.studentid

    const [studentdob, setStudentdob] = useState("")
 


    const [records, setRecords] = useState("")

    useEffect(() => {
        // Fetch from backend    

        fetch(backendUrl + `/api/student/list/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setRecords(data.data); // store only "data" array   
                    const formattedDob = new Date(data.data.studentdob).toISOString().split("T")[0];
                    setStudentdob(formattedDob)
                   
                }
            })
            .catch((err) => console.error(err));
    }, [id]);


    // console.log(records );   



    return (

        <div className='flex items-start'>
            <Navbar />
            <Header />  

            <div className='flex flex-col  mt-16 ' >
                <div className='flex justify-between p-3 items-center'>
                    <p className='mb-3 text-lg font-medium '>Update Student Details</p>
                </div>

                <form className=' m-5 mt-0 border   '>


                    <div className='bg-white px-8 p-3 rounded mb-2 ' >


                        <div className='flex justify-between p-5 rounded '  >

                            <div className='mr-5'>

                                <div className='flex mt-1 items-center'>
                                    <p className='-2 mr-1 w-35  '>Student ID</p>
                                    <p className='p-2'>:</p>
                                    <p className='border-b p-1 w-70'>{records.studid}</p>
                                </div>

                                <div className='flex items-center'>
                                    <p className='-2 mr-1 w-35 '>Student Name</p>
                                    <p className='p-2'>:</p>
                                    <p className='border-b p-1 w-70'>{records.name}</p>
                                </div>


                                <div className='flex items-center '>
                                    <p className='-2 mr-1 w-35 '>Email</p>
                                    <p className='p-2'>:</p>
                                    <p className='border-b p-1 w-70'>{records.email}</p>
                                </div>


                                <div className='flex items-center'>
                                    <p className='-2 mr-1 w-35 '>Mobile No</p>
                                    <p className='p-2'>:</p>
                                    <p className='border-b p-1 w-70'>{records.studentmobileno}</p>
                                </div>

                                <div className='flex items-center '>
                                    <p className='-2 mr-1 w-35 '>D.O.B</p>
                                    <p className='p-2'>:</p>
                                    <p className='border-b p-1 w-70'>{(studentdob)}</p>
                                </div>

                                <div className='flex items-center '>
                                    <p className='-2 mr-1 w-35 '>Gender</p>
                                    <p className='p-2'>:</p>
                                    <p className='border-b p-1 w-70'>{records.studentgender}</p>
                                </div>

                                <div className='flex items-center '>
                                    <p className='-2 mr-1 w-35 '>Education</p>
                                    <p className='p-2'>:</p>
                                    <p className='border-b p-1 w-70'>{records.studenteducation}</p>
                                </div>



                                <div className='flex items-center '>
                                    <p className='-2 mr-1 w-35 '>Blood Group</p>
                                    <p className='p-2'>:</p>
                                    <p className='border-b p-1 w-70'>{records.studentbloodgroup}</p>
                                </div>

                                <div className='flex items-center  '>
                                    <p className='-2 mr-1 w-35 '>Address</p>
                                    <p className='p-2'>:</p>
                                    <p className='border-b p-1 w-70'>{records.studentaddress}</p>

                                </div>


                            </div>



                            <div className=''>

                                <div className='flex flex-col items-center justify-center ml-5' >
                                    <img src={ `${backendUrl}/Uploads/${records.studentpic}` || logo} alt="not found" className='border rounded w-30 ' />
                                    <span>Profile Photo </span>
                                </div>

                                <div className='items-center mt-5  flex justify-center' >
                                    <button className='bg-blue-500 px-7 py-1 text-white rounded-full' onClick={()=>navigate(`/update-profile/${id}`)}  >Update</button>                                    
                                </div>

                            </div>

                        </div>














                    </div>
                </form>


            </div>

        </div>
    )
}

export default Profile

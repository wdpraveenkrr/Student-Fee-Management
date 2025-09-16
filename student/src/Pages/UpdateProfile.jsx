import React, { useContext } from 'react'
import { toast } from "react-toastify";
import { useState } from 'react'
import { useEffect } from 'react';

import Axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import Header from './Header';
import profile from '../assets/profile.png'
import { AppContent } from '../context/AppContext';

const UpdateProfile = () => {


    const { backendUrl } = useContext(AppContent)

    const navigate = useNavigate();

    const { id } = useParams();

    // console.log(id);

    const [studentdob, setStudentdob] = useState("")
    const [studentgender, setStudentgender] = useState("male")
    const [studenteducation, setStudenteducation] = useState("sslc")
    const [studentbloodgroup, setStudentbloodgroup] = useState("a-positive")
    const [studentmobileno, setStudentmobileno] = useState("")
    const [studentaddress, setStudentaddress] = useState("")
    const [studentpic, setStudentpic] = useState(null)


    const [records, setRecords] = useState("")


    const [preview, setPreview] = useState(null)
    const [studentprofile, setStudentprofile] = useState("")

    const onChangeFileHandler =(e) => {
        const fileimage =e.target.files[0];
        setStudentpic(e.target.files[0])



        if (fileimage) {
            const url = URL.createObjectURL(fileimage);
            setPreview(url)
        }
    }

    // console.log("Student Picture",studentpic);

    useEffect(() => {
        // Fetch from backend    

        fetch(backendUrl + `/api/student/list/${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setRecords(data.data); // store only "data" array   
                    setStudentprofile(data.data.studentpic)
                    const formattedDob = new Date(data.data.studentdob).toISOString().split("T")[0];
                    setStudentdob(formattedDob)
                    setStudentgender(data.data.studentgender)
                    setStudenteducation(data.data.studenteducation)
                    setStudentbloodgroup(data.data.studentbloodgroup)
                    setStudentmobileno(data.data.studentmobileno)
                    setStudentaddress(data.data.studentaddress)
                }
            })
            .catch((err) => console.error(err));
    }, [id]);


    // console.log("Profile pic --->", studentpic);


    const onClickResetHandler = () => {
        window.location.reload()
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {



            const updatedStudent = { studentpic , studentdob, studentgender, studenteducation, studentbloodgroup, studentmobileno, studentaddress }


            const { data } = await Axios.put(backendUrl + `/api/student/update/${id}`, updatedStudent, {
                headers: {
                    "Content-Type": "multipart/form-data",  // tells server you are sending JSON
                    "Authorization": "Bearer yourTokenHere", // if you use JWT token
                    "Custom-Header": "value123",          // any custom header     }
                }
            })
            if (data.success) {
                navigate('/profile')
                console.log(data.data); //
                toast.success("Profile Updated");
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error.message);

        }
    }


    return (

        <div className='flex items-start'>
            <Navbar />
            <Header />

            <div className='flex flex-col  mt-16 ' >
                <div className='flex justify-between p-3 items-center'>
                    <p className='mb-3 text-lg font-medium '>Update Student Details</p>
                    <button className='bg-black px-8 py-1.5 mr-5 text-white rounded-full' onClick={() => navigate('/profile/')} >Back</button>
                </div>

                <form onSubmit={onSubmitHandler} className=' m-5 mt-0 border   '>


                    <div className='bg-white px-8 p-3 rounded mb-2 ' >


                        <div className='flex justify-between p-5 rounded '  >

                            <div className='mr-5'>

                                <div className='flex mt-1 items-center'>
                                    <p className='-2 mr-1 w-35  '>Student ID</p>
                                    <p className='p-2'>:</p>
                                    <input type="text" className='border-b p-1 w-70 outline-none' placeholder={records.studid} disabled />
                                </div>

                                <div className='flex items-center mt-3'>
                                    <p className='-2 mr-1 w-35 '>Student Name</p>
                                    <p className='p-2'>:</p>
                                    <input type="text" className='border-b p-1 w-70 outline-none' placeholder={records.name} />
                                </div>


                                <div className='flex items-center mt-3'>
                                    <p className='-2 mr-1 w-35 '>Email</p>
                                    <p className='p-2'>:</p>
                                    <input type="text" className='border-b p-1 w-70 outline-none' placeholder={records.email} />
                                </div>


                                <div className='flex items-center mt-3'>
                                    <p className='-2 mr-1 w-35 '>Mobile No</p>
                                    <p className='p-2'>:</p>
                                    <input type="number" className='border-b p-1 w-70 outline-none' value={studentmobileno || ""} onChange={(e) => setStudentmobileno(e.target.value)} />
                                </div>

                            </div>



                            <div className=''>

                                <div className='flex items-center mt-3'>
                                    <p className='-2 mr-1 w-35 '>D.O.B</p>
                                    <p className='p-2'>:</p>
                                    <input type="date" className='border rounded p-1 w-70' value={studentdob || ""} onChange={(e) => setStudentdob(e.target.value)} />
                                </div>

                                <div className='flex items-center mt-3'>
                                    <p className='-2 mr-1 w-35 '>Gender</p>
                                    <p className='p-2'>:</p>
                                    <select name="gender" id="gender" value={studentgender} onChange={(e) => setStudentgender(e.target.value)} className='border rounded p-1 w-70' >
                                        <option value="">--Select Gender--</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="others">Others</option>
                                    </select>
                                </div>

                                <div className='flex items-center mt-3'>
                                    <p className='-2 mr-1 w-35 '>Education</p>
                                    <p className='p-2'>:</p>
                                    <select name="education" id="education" value={studenteducation} onChange={(e) => setStudenteducation(e.target.value)} className='border rounded p-1 w-70' >
                                        <option value="">--Select Education--</option>
                                        <option value="sslc">SSLC</option>
                                        <option value="hsc">HSC</option>
                                        <option value="diploma">DIPLOMA</option>
                                        <option value="ug">UG</option>
                                        <option value="pg">PG</option>
                                        <option value="others">OTHERS</option>
                                    </select>
                                </div>



                                <div className='flex items-center mt-3'>
                                    <p className='-2 mr-1 w-35 '>Blood Group</p>
                                    <p className='p-2'>:</p>
                                    <select name="bloodgroup" id="bloodgroup" value={studentbloodgroup} onChange={(e) => setStudentbloodgroup(e.target.value)} className='border rounded p-1 w-70' >
                                        <option value="">--Select Blood Group--</option>
                                        <option value="a-positive">A+ve</option>
                                        <option value="b-positive">B+ve</option>
                                        <option value="o-positive">O+ve</option>
                                        <option value="o-negative">O-ve</option>
                                        <option value="ab-positive">AB+ve</option>
                                        <option value="others">Others</option>
                                    </select>
                                </div>

                            </div>

                        </div>


                        <div className='flex'>

                            <div className='flex items-center  '>
                                <p className='-2 mr-1 w-35 '>Address</p>
                                <p className='p-2'>:</p>
                                <textarea name="address" id="address" value={studentaddress || ""} onChange={(e) => setStudentaddress(e.target.value)} className='p-1 min-h-28 border w-xl' ></textarea>
                            </div>

                            <div className='flex items-center gap-4 mb-8 text-gray-500 m-3'>
                                <label htmlFor="stud-profile-img">
                                    <img src={preview ? preview : `${backendUrl}/Uploads/${studentprofile}`} alt="" className='w-16  h-16  bg-gray-100 rounded cursor-pointer' />
                                </label>
                                <input type="file" id='stud-profile-img' hidden className='cursor-pointer' accept='.jpeg, .png, .jpg' onChange={onChangeFileHandler} />
                                <p>upload Profile <br /> picture</p>
                            </div>

                        </div>






                        <div className='items-center mt-5 w-70 flex justify-between' >
                            <button className='bg-blue-500 px-8 py-1.5 text-white rounded-full' type='submit' >Update</button>
                            <button className='bg-black px-8 py-1.5 text-white rounded-full' onClick={onClickResetHandler} >Reset</button>

                        </div>





                    </div>
                </form>


            </div >

        </div >
    )
}

export default UpdateProfile


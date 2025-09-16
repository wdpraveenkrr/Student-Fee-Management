import React, { useContext, useEffect, useState } from 'react'
import { toast } from "react-toastify";
import Axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

import sign from '../assets/sign.png'
import logodesign from '../assets/logo.png'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useRef } from 'react';
import Navbar from '../Components/Navbar';
import Header from './Header';
import { AppContent } from '../context/AppContext';

const ViewCourse = () => {

    const navigate = useNavigate()

    const {backendUrl}=useContext(AppContent)


    const url = window.location.pathname.split("/")

    const studentId = url[2]
    const courseId = url[4]


    const [records, setRecords] = useState("")
    const [coursedetails, setCoursedetails] = useState("")
    const [paidfee, setPaidfee] = useState("")
    const [payments, setPayments] = useState([])
    const [view, setView] = useState(false)
    const [pay, setPay] = useState('')

    useEffect(() => {
        // Fetch from backend
        fetch(backendUrl +`/api/student/list/${studentId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setRecords(data.data); // store only "data" array
                    // setCoursedetails(data.data.studentCourseDetails)
                    // console.log("Hints--->", data.data);

                }
            })
            .catch((err) => console.error(err));
    }, []);


    const getCourseId = () => {

        fetch(backendUrl + `/api/student/${studentId}/course/${courseId}/details`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setCoursedetails(data.data)                   // console.log("Course Details--->", data.data);    
                }
            })
            .catch((err) => console.error(err));

    }
    useEffect(() => {

        getCourseId()

    }, []);


    useEffect(() => {
        // Fetch from backend
        fetch(backendUrl +`/api/payment/list/`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setPayments(data.data); // store only "data" array             
                }
            })
            .catch((err) => console.error(err));
    }, []);

    // console.log("Fee Array -->", payments );



    const totalpaid = payments.filter((item) => {
        return ((item.studentId === `${studentId}`) && (item.courseId === `${courseId}`)) ? item.paidAmount : "";
    }).reduce((sum, value) => {
        return sum + value.paidAmount
    }, 0)

    const printRef = useRef(null);

    const handleDownloadPdf = async () => {

        const element = printRef.current

        if (!element) {
            return;
        }

        const canvas = await html2canvas(element, {
            scale: 2
        });
        const data = canvas.toDataURL('image/png')

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4"
        })

        const imgProperties = pdf.getImageProperties(data)
        const pdfWidth = pdf.internal.pageSize.getWidth();

        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("Receipt.pdf")

    }

    const handleView = async (event) => {

        const { data } = await Axios.get(backendUrl +`/api/payment/list/${event}`)

        if (data.success) {
            // console.log(data.data);
            setView(true)
            setPay(data.data)
        }
    }




    return (

        <div className='flex items-start'>
            <Navbar />
            <Header />

            <div className='m-5 mt-15 ' >
                
                    <div className='flex justify-between p-3'>
                        <p className='mb-3 text-lg font-medium'>Student Fee Details</p>
                        <button onClick={()=> navigate("/my-course/")} className=' cursor-pointer bg-black text-white  py-1 px-6 rounded-full' > Go to Course</button>
                    </div>

                    <form className='w-4xl'>

                    <div className='bg-white px-8 p-3' >

                        <div className='p-5 rounded flex justify-between'>
                           
                           <div>
                            <div className='flex items-center'>
                                <p className='-2 mr-1 w-35 font-bold'>Student Id</p>
                                <p className='p-2'>:</p>
                                <p className=' p-2'>{records.studid}</p>
                            </div>

                            <div className='flex items-center'>
                                <p className='-2 mr-1 w-35 font-bold'>Student Name</p>
                                <p className='p-2'>:</p>
                                <p className=' p-2'>{records.name}</p>
                            </div>

                            <div className='flex items-center'>
                                <p className='-2 mr-1 w-35 font-bold'>Course Name</p>
                                <p className='p-2'>:</p>
                                <p className=' p-2'>{coursedetails.coursename}</p>
                            </div>

                            <div className='flex items-center'>
                                <p className='-2 mr-1 w-35 font-bold'>Course Duration</p>
                                <p className='p-2'>:</p>
                                <p className=' p-2'>{coursedetails.courseduration} Months</p>
                            </div>

                            </div>

                            <div>
                            <div className='flex items-center'>
                                <p className='-2 mr-1 w-35 font-bold'>Total Amount</p>
                                <p className='p-2'>:</p>
                                <p className=' p-2'>Rs.{coursedetails.coursefee}/-</p>
                            </div>

                            <div className='flex items-center'>
                                <p className='-2 mr-1 w-35 font-bold'>Total Paid Amount</p>
                                <p className='p-2'>:</p>
                                <p className=' p-2'>Rs.{totalpaid}/-</p>
                            </div>

                            <div className='flex items-center'>
                                <p className='-2 mr-1 w-35 font-bold'>Balance Amount</p>
                                <p className='p-2'>:</p>
                                <p className=' p-2'>Rs.{((coursedetails.coursefee) - (totalpaid))}/-</p>
                            </div>
                            </div>
                        </div>

                        <div className='w-4xl' >

                            <table className="table-auto border-collapse ">
                                <thead>
                                    <tr className="bg-blue-300">
                                        <th className="border p-1">S.No</th>
                                        <th className="border p-">Payment Id</th>
                                        <th className="border p-1">Paid Date</th>
                                        <th className="border p-1">Student Name</th>
                                        <th className="border p-1">Course</th>
                                        <th className="border p-1">Paid Amount</th>
                                        <th className="border p-1 ">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.filter((item) => {
                                        return ((item.studentId === `${studentId}`) && (item.courseId === `${courseId}`)) ? item.paidAmount : "";
                                    }).map((record, index) => (
                                        <tr key={index} className='text-sm' >
                                            <td className="border p-2 text-center">{index + 1}</td>
                                            <td className="border p-2 text-center">{record._id}</td>
                                            <td className="border p-2 text-center">{new Date(record.createdAt).toDateString()} </td>
                                            <td className="border p-2">{record.studentname}</td>
                                            <td className="border p-2">{record.courseName}</td>
                                            <td className="border p-2 text-center"> &#8377; {record.paidAmount}</td>
                                            <td className="border p-2 text-center items-center">
                                                <input type="button" value={"View"} onClick={() => handleView(record._id)} className='bg-blue-500 px-6  p-0.5 text-white rounded  font-semibold m-1 shadow-lg cursor-pointer' />
                                            </td>
                                        </tr>
                                    ))}
                                    <tr><td colSpan={5} className='border p-2 text-end font-bold m-2' >Grand Total :</td><td colSpan={2} className='border p-2 font-bold px-9 m-2'>{totalpaid}</td></tr>
                                </tbody>
                            </table>

                        </div>


                    </div>
                </form>

                {view && (

                    <div className='flex justify-center fixed top-0 left-0 bottom-0   bg-gray-50 w-full' >

                        <div>


                            <div ref={printRef}
                                className=" h-130 mt-10 p-6 py-2 m-3 rounded shadow-lg bg-white "
                            >
                                {/* Header */}
                                <header className="flex flex-col">
                                    <div className="flex items-center">
                                        <img src={logodesign} className="w-20 cursor-pointer" alt="logo" />
                                        <h2 className="text-2xl font-bold ml-3">Prince Institution</h2>
                                    </div>
                                    <p className="font-semibold ml-3">
                                        No.22, Ashok Tower, GST Road, Guduvancherry, TamilNadu-603202.
                                    </p>
                                </header>

                                <hr className="mt-2" />

                                <div className="text-center mb-4 mt-2">
                                    <h1 className="text-xl font-bold">Payment Receipt</h1>
                                </div>

                                {/* Receipt Body */}
                                <div className="space-y-2 text-[#111827] m-2 px-8">
                                    <div className="flex">
                                        <p className="font-medium w-40">Receipt No</p>
                                        <p className="font-medium w-10 text-center">:</p>
                                        <p className="font-medium uppercase">{pay._id}</p>
                                    </div>

                                    <div className="flex">
                                        <p className="font-medium w-40">Date</p>
                                        <p className="font-medium w-10 text-center">:</p>
                                        <p className="font-medium">
                                            {(new Date(pay.createdAt).toString()).split("GMT")[0]}
                                        </p>
                                    </div>

                                    <div className="flex">
                                        <p className="font-medium w-40">Student Id</p>
                                        <p className="font-medium w-10 text-center">:</p>
                                        <p className="font-medium">{pay.stdId}</p>
                                    </div>

                                    <div className="flex">
                                        <p className="font-medium w-40">Student Name</p>
                                        <p className="font-medium w-10 text-center">:</p>
                                        <p className="font-medium">{pay.studentname}</p>
                                    </div>

                                    <div className="flex">
                                        <p className="font-medium w-40">Course</p>
                                        <p className="font-medium w-10 text-center">:</p>
                                        <p className="font-medium">{pay.courseName}</p>
                                    </div>

                                    <div className="flex">
                                        <p className="font-medium w-40">Paid Amount</p>
                                        <p className="font-medium w-10 text-center">:</p>
                                        <p className="font-medium">Rs.{pay.paidAmount}/-</p>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-6 flex mb-5 justify-between">
                                    <div>
                                        <b className="border-b p-2">Terms & Conditions :-</b>
                                        <p className="p-2">
                                            All fees are non-refundable. Payments must be made by the due date
                                            to avoid late fees.
                                        </p>
                                        <p className="p-2">
                                            For any queries, please reach out to <b>PRAVEEN</b> at{" "}
                                            <b>wdpraveenkrr@gmail.com</b>
                                        </p>
                                    </div>

                                    <div className="m-2 p-2 text-center">
                                        <img src={sign} className="w-40 mx-auto" alt="signature" />
                                        <p className="font-semibold">Authorized Signature</p>
                                        <span>Prince Abraham</span>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-center'>
                                <button className='bg-blue-600 text-white rounded px-8 py-2 m-2 font-bold '
                                    onClick={() => handleDownloadPdf()}
                                >
                                    Print / Save as PDF
                                </button>

                                <button className='bg-black text-white rounded py-2 px-3 m-2 font-bold ' onClick={() => setView(false)} >
                                    close
                                </button>
                            </div>

                        </div>

                    </div>
                )}
            </div>

        </div>

    )
}

export default ViewCourse
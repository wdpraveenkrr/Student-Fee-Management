import React, { useContext, useEffect, useRef, useState } from 'react'
import Axios from 'axios';
import { toast } from "react-toastify";
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import sign from '../assets/sign.png'
import logodesign from '../assets/logo.png'
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import { ApiContext } from '../Context/ApiContext';

const Reports = () => {

  const {backendUrl}=useContext(ApiContext)


  const [records, setRecords] = useState([])
  const [payments, setPayments] = useState([])
  const [search, setSearch] = useState("")
  const [view, setView] = useState(false)
  const [startdate, setStartdate] = useState("")
  const [enddate, setEnddate] = useState("")

  // Fetch from backend

  // console.log("Start Date -->", startdate);
  // console.log("End Date -->", enddate);

  useEffect(() => {
    fetch(backendUrl + `/api/payment/list/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRecords(data.data)
        }
      })
      .catch((err) => console.error(err));

  }, []);


  const handleViewDetails = async (event) => {
    setView(true)

    const { data } = await Axios.get(backendUrl + `/api/payment/list/${event}`)

    if (data.success) {
      // console.log(data.data);
      setPayments(data.data)
    }
  }



  const totalpaid = records.filter((item) => {
    const dt = new Date(item.createdAt).toISOString().split("T")[0];
    return startdate && enddate != "" ? dt >= startdate && dt <= enddate : item;
  }).filter((item) => {
    return search.toLowerCase() === "" ? item :
      item.studentname.toLowerCase().includes(search.toLowerCase()) ||
      item.courseName.toLowerCase().includes(search.toLowerCase()) ||
      item.paidAmount.toString().includes(search)
  }).reduce((sum, value) => {
    return sum + value.paidAmount
  }, 0)

  // console.log("Total Earnings :", totalpaid);

  const HandlePaymentDelete = async (e) => {
    // console.log("Delete Id", e);

    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      const { data } = await Axios.delete(backendUrl + `/api/payment/remove/${e}`)

      if (data.success) {
        console.log(data.message);
        setTimeout(() => {
          toast.success("Payment Deleted")
        }, 5)
        window.location.reload();
      }
      else {
        console.log(data.message);
      }
    }
  }

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

  const handleDateRangeClear = () => {
    setStartdate("")
    setEnddate("")
  }

  return (
      <div>
          <Navbar/>          
          <div className='flex mt-5'>          
          <Sidebar/> 
    <div className='mt-15'>
      <div className='flex w-5xl items-center justify-between m-3 p-2 rounded'>
        <p className='text-2xl font-medium'>Reports</p>
        <p className='font-medium'>Search <input type="text" className='border shadow-lg  p-1 px-2 rounded' onChange={(e) => setSearch(e.target.value)} /></p>
        <p className='font-medium'>From <input type="date" value={startdate} onChange={(e) => setStartdate(e.target.value)} className='border shadow-lg  p-1 px-2 rounded' /></p>
        <p className='font-medium'>To <input type="date" value={enddate} onChange={(e) => setEnddate(e.target.value)} className='border p-1 shadow-lg  px-2 rounded' /></p>
        <p className='font-medium'><input type="button" value={"Clear"} onClick={() => handleDateRangeClear()} className='bg-red-500 text-white shadow-lg  p-1 px-3 rounded' /></p>
        <p className='font-medium'><input type="button" value={"Download"} onClick={() => handleDownloadPdf()} className='bg-black text-white shadow-lg  p-1 px-5 rounded' /></p>


      </div>

      <div className='mt-5 text-sm '>

        <div ref={printRef} className=' flex flex-col py-5 p-5 px-10' >

          <table className="table-auto border-collapse border w-full ">
            <thead>
              <tr className="bg-[#ADD8E6]">
                <th className="border p-2">S.No</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Payment Id</th>
                <th className="border p-2">Student Id</th>
                <th className="border p-2">Student Name</th>
                <th className="border p-2">Course</th>
                <th className="border p-2">Paid Amount</th>
              </tr>
            </thead>
            <tbody>
              {records.filter((item) => {
                const dt = new Date(item.createdAt).toISOString().split("T")[0];
                return startdate && enddate != "" ? dt >= startdate && dt <= enddate : item;
              }).filter((item) => {
                return search.toLowerCase() === "" ? item :
                  item.studentname.toLowerCase().includes(search.toLowerCase()) ||
                  item.courseName.toLowerCase().includes(search.toLowerCase()) ||
                  item.paidAmount.toString().includes(search)
              }).map((record, index) => (
                <tr key={index} className=' hover:bg-gray-100' >
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2 text-center">{new Date(record.createdAt).toISOString().split("T")[0]} </td>
                  {/* <td className="border p-2 text-center">{record.createdAt} </td> */}
                  <td className="border p-2 text-center">{record._id}</td>
                  <td className="border p-2 uppercase">{record.studentId}</td>
                  <td className="border p-2">{record.studentname}</td>
                  <td className="border p-2">{record.courseName}</td>
                  <td className="border p-2 text-center"> &#8377; {record.paidAmount}</td>
                </tr>
              ))}
              <tr><td colSpan={6} className='border p-2 text-end font-bold m-2' >Grand Total :</td><td className='border p-2 font-bold px-9 m-2'>{totalpaid}</td> </tr>
            </tbody>
          </table>


        </div>

      </div>

    </div>
    </div>
    </div>
  )
}

export default Reports




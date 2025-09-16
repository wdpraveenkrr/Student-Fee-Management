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

const PaymentList = () => {

  const {backendUrl}=useContext(ApiContext)


  const [records, setRecords] = useState([])
  const [payments, setPayments] = useState([])
  const [search, setSearch] = useState("")
  const [view, setView] = useState(false)


  // Fetch from backend


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

 
  return (
    <div>
      <Navbar />
      <div className='flex mt-5'>

        <Sidebar />
        <div className='mt-15'>
          <div className='flex w-4xl items-center justify-between m-3 p-2 rounded'>
            <p className='text-2xl font-medium'>Payment List</p>
            <p className='font-medium'>Search <input type="text" className='border p-1 px-2 rounded' onChange={(e) => setSearch(e.target.value)} /></p>
          </div>

          <div className='ml-7 mt-5'>

            <div className='border flex flex-col w-4xl text-sm' >

              <table className="table-auto border-collapse border w-full">
                <thead>
                  <tr className="bg-blue-300">
                    <th className="border p-2">S.No</th>
                    {/* <th className="border p-2">Payment Id</th> */}
                    <th className="border p-2">Paid Date</th>
                    <th className="border p-2">Student Name</th>
                    <th className="border p-2">Course</th>
                    <th className="border p-2">Paid Amount</th>
                    <th className="border p-2 ">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {records.filter((item) => {
                    return search.toLowerCase() === "" ? item :
                      item.studentname.toLowerCase().includes(search.toLowerCase()) ||
                      item.courseName.toLowerCase().includes(search.toLowerCase()) ||
                      item.paidAmount.toString().includes(search)
                  }).map((record, index) => (
                    <tr key={index}>
                      <td className="border p-2 text-center">{index + 1}</td>
                      {/* <td className="border p-2 text-center">{record._id}</td> */}
                      <td className="border p-2 text-center">{new Date(record.createdAt).toDateString()} </td>
                      <td className="border p-2">{record.studentname}</td>
                      <td className="border p-2">{record.courseName}</td>
                      <td className="border p-2 text-center"> &#8377; {record.paidAmount}</td>
                      <td className="border p-2 text-center items-center">

                        <button className='bg-blue-500 px-7 p-1 text-white rounded  m-1 font-semibold shadow-lg ' onClick={() => handleViewDetails(record._id)} >View</button>
                        <button className='bg-red-500 px-7 p-1 text-white rounded m-1 font-semibold shadow-lg' onClick={() => HandlePaymentDelete(record._id)} >Delete</button>
                      </td>
                    </tr>
                  ))}
                  <tr><td colSpan={5} className='border p-2 text-end font-bold m-2' >Grand Total :</td><td colSpan={2} className='border p-2 font-bold px-9 m-2'>{totalpaid}</td> </tr>
                </tbody>
              </table>


            </div>



            {/* // receipt form  */}

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
                        <p className="font-medium uppercase">{payments._id}</p>
                      </div>

                      <div className="flex">
                        <p className="font-medium w-40">Date</p>
                        <p className="font-medium w-10 text-center">:</p>
                        <p className="font-medium">
                          {(new Date(payments.createdAt).toString()).split("GMT")[0]}
                        </p>
                      </div>

                      <div className="flex">
                        <p className="font-medium w-40">Student Id</p>
                        <p className="font-medium w-10 text-center">:</p>
                        <p className="font-medium">{payments.stdId}</p>
                      </div>

                      <div className="flex">
                        <p className="font-medium w-40">Student Name</p>
                        <p className="font-medium w-10 text-center">:</p>
                        <p className="font-medium">{payments.studentname}</p>
                      </div>

                      <div className="flex">
                        <p className="font-medium w-40">Course</p>
                        <p className="font-medium w-10 text-center">:</p>
                        <p className="font-medium">{payments.courseName}</p>
                      </div>

                      <div className="flex">
                        <p className="font-medium w-40">Paid Amount</p>
                        <p className="font-medium w-10 text-center">:</p>
                        <p className="font-medium">Rs.{payments.paidAmount}/-</p>
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
      </div>
    </div>
  )
}

export default PaymentList




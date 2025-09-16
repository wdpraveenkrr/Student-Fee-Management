import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Success = () => {

    const location = useLocation()
    const navigate = useNavigate()

    // console.log(location);

    const queryParams = new URLSearchParams(location.search)

    // console.log(queryParams);

    const success = queryParams.get("success");
    const orderId = queryParams.get("order");

    // console.log(success);
    // console.log(orderId);




    return (
        <div className='flex items-center justify-center h-[80vh]'>

            <div className="flex flex-col w-100 h-50 p-5 border items-center justify-center">
                <h1 >Payment {success === "true" ? "Successful ✅" : "Failed ❌"}</h1>
                {orderId && <p>Order ID: {orderId}</p>}
                <button onClick={()=>navigate('/home')} className='bg-black text-white p-2 px-3 rounded' >Go to Dashboard</button>
            </div>

        </div>
    )
}

export default Success
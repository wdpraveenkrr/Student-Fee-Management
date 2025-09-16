import React, { useContext, useState } from 'react'
import Navbar from '../Components/Navbar'
import Header from './Header'
import { toast } from 'react-toastify'
import axios from 'axios'

const Feedback = () => {



    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(event.target);

        formData.append("access_key", "a3eb81a3-dc34-4082-9caa-a72a34fc7ac6");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        }).then((res) => res.json());

        if (res.success) {
            console.log("Success", res);
            toast.success("Mail send Successfully..")
            form.reset()

        }
    }




    return (
        <div className='flex items-start'>
            <Navbar />
            <Header />
            

            <form className='mt-20 border w-2xl ml-5 p-5' onSubmit={onSubmitHandler}  >
                
                
                <div className='flex '>
                    <p className='w-20 p-1'>Name</p>
                    <input type="text" name="name" required placeholder='Enter your Name' className='border-b-2 outline-none' />
                </div>

                <div className='flex mt-5'>
                    <p className='w-20 p-1'>Email</p>
                    <input type="email" name="email" required placeholder='Enter your Email Id' className='border-b-2 outline-none' />
                </div>


                <div className='mt-5' >
                    <p className='w-20 p-1'>Message</p>
                    <textarea className='h-40 border w-full rounded p-2' name="message" required placeholder='Describe your query or any other suggestions..'></textarea>
                </div>





                <div className='w-60 flex justify-between mt-3'>
                    <button className='bg-blue-500 text-white p-1 px-8 font-semibold rounded-full' type='submit' >Submit</button>
                    <button className='bg-black text-white p-1 px-8 font-semibold rounded-full' type='reset' >Reset</button>

                </div>


            </form>
        </div>
    )
}

export default Feedback
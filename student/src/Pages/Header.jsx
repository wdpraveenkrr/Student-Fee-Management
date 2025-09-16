import React, { useContext, useEffect } from 'react'
import { AppContent } from '../context/AppContext'
import Sidebar from '../Components/Sidebar'
import Dashboard from './Dashboard'
import { Route, Router, Routes } from 'react-router-dom'

const Header = () => {

    const { userData } = useContext(AppContent)

    useEffect(() => {
        userData
    })

    return (
        <div>

            <div className='flex  mt-15 flex-col w-full'>
                <h2 className='flex  items-center justify-center'>Hey! {userData ? userData.name : 'Developer'}</h2>
            </div>

            <div className='flex items-start '>
                <Sidebar />






            </div>



        </div>
    )
}

export default Header
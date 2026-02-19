import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext()

export const AppContextProvider = (props) => {

    axios.defaults.withCredentials = true

    const backendUrl = 'https://fee-management-backend-5skp.onrender.com'

    const uploadPath = `${backendUrl}/Uploads`;

    const [isloggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(false)
    
    const getAuthState = async()=>{
        try {

            const {data}= await axios.get(backendUrl + '/api/student/is-auth')

            if(data.success){
                setIsLoggedin(true)
                getUserData()            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getUserData = async()=>{
        try {
            
            const {data} = await axios.get(backendUrl + '/api/user/data')
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }


    useEffect(()=>{
        getAuthState();
    },[])



    const value = {
        backendUrl,
        isloggedin, setIsLoggedin,
        userData, setUserData, getUserData,
        uploadPath
    }

    return (
        <AppContent.Provider value={value} >
            {props.children}
        </AppContent.Provider>
    )

}

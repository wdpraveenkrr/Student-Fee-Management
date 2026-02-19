import React, { createContext } from 'react'

export const ApiContext = createContext()

export const ApiProvider =(props)=>{
    


    const backendUrl = 'https://fee-management-backend-5skp.onrender.com/'

    const value={ backendUrl }

    return(
        <ApiContext.Provider value={value}>
            {props.children}
        </ApiContext.Provider>
    )

}

  


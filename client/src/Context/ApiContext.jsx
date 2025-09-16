import React, { createContext } from 'react'

export const ApiContext = createContext()

export const ApiProvider =(props)=>{
    


    const backendUrl = 'https://student-fee-management-bblb.onrender.com'

    const value={ backendUrl }

    return(
        <ApiContext.Provider value={value}>
            {props.children}
        </ApiContext.Provider>
    )

}

  


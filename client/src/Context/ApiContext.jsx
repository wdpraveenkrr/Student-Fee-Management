import React, { createContext } from 'react'

export const ApiContext = createContext()

export const ApiProvider =(props)=>{
    


    const backendUrl = 'http://localhost:4000'

    const value={ backendUrl }

    return(
        <ApiContext.Provider value={value}>
            {props.children}
        </ApiContext.Provider>
    )

}

  


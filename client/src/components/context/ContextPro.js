import React, { createContext, useState } from 'react'

export const addData=createContext()

const ContextPro = (props) => {
    const [useradd,setuseradd]=useState("")
    const [update,setupdate]=useState("")
    const [deleted,setdeleted]=useState("")
  return (
    <div>
    <addData.Provider value={{useradd,setuseradd,update,setupdate,deleted,setdeleted}}>
        {props.children}
    </addData.Provider>
      
    </div>
  )
}

export default ContextPro

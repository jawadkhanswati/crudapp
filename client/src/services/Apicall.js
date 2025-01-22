import axios from "axios"

export const commonrequest=async(methods,url,body,header)=>{
    let config={
      methods,
        url,
        headers:header ? header:{
            "Content-Type":"application/json"
        },
        data:body
    }

    //axios instant
    return axios(config).then((data)=>{
        return data
    }).catch((error)=>{
        return error
    })
}
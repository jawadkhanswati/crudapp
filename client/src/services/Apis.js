import { commonrequest } from "./Apicall";
import { BASE_URL } from "./helper";

export const registerfunc=async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/api/user/register`,data,header)
}

export const usergetfunc=async(search,gender,status,oldnew,page)=>{
    return await commonrequest("Get",`${BASE_URL}/api/user/details?search=${search}&gender=${gender}&status=${status}&oldnew=${oldnew}&page=${page}`,"")
}

export const singleuserget = async(id)=>{
    return await commonrequest("GET",`${BASE_URL}/api/user/${id}`,"")
}

export const editfunc=async(id,data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/api/user/edit/${id}`,data,header)
}

export const deletefunction=async(id)=>{
    return await commonrequest("DELETE",`${BASE_URL}/api/user/delete/${id}`,{})
}

export const statuschangefunction=async(id,data)=>{
    return await commonrequest("PUT",`${BASE_URL}/api/user/status/${id}`,{data})
}
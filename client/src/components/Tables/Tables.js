import React, { useEffect, useState } from 'react'
import "./table.css"
import {Row,Card,Table,Dropdown,DropdownButton, Badge} from "react-bootstrap"
import { BASE_URL } from '../../services/helper'
import { NavLink } from 'react-router-dom'
import { statuschangefunction } from '../../services/Apis'
import { ToastContainer,toast } from 'react-toastify'
import Paginations from '../Pagination/Paginations'

function Tables({userdata,deleteuser,userGet,handleprevious,handleNext,page,pagecount,setpage}) { 

  

  const handlestatuschange=async(id,status)=>{
    console.log(id,status)
    const response=await statuschangefunction(id,status);
    if(response.status===200){
      userGet()
      toast.success("user updated successfully")
    }else{
      toast.error("error")
    }
  }

  useEffect(()=>{
    
  },[])
  const capitilizefunc=(strr)=>{
    let str=strr.split(" ")
    for(let i=0;i<str.length;i++){
      str[i]=str[i][0].toUpperCase()+str[i].substring(1)
    }
    return str.join(" ")
  }
  return (
    <>
    <div className="container m-3">
      <Row>
        <div className="col mt-0">
          <Card className='shadow'>
            <Table className='align-items-center' responsive="sm">
              <thead className='thead-dark'>
                <tr className='table-dark'>
                  <th>ID</th>
                  <th>Fullname</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Status</th>
                  <th>Profile</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {
                  userdata.length>0?userdata.map((element,index)=>{
                    return (
                      <>
                           <tr key={index+1}>
                  <td>{index+1 + (page-1)*4}</td>
                  <td>{element.fname+ capitilizefunc(element.lname)}</td>
                  <td>{element.email}</td>
                  <td>{element.gender.charAt(0).toUpperCase()}</td>
                  <td className='d-flex align-item-center'>
                  <DropdownButton title= {<Badge bg={element.status==="Active"?"primary":"danger"}>
                    {element.status}
                     <i class="fa-solid fa-angle-down"></i></Badge>}>
      <Dropdown.Item onClick={()=>handlestatuschange(element._id,"Active")}>Active</Dropdown.Item>
      <Dropdown.Item onClick={()=>handlestatuschange(element._id,"InActive")}>InActive</Dropdown.Item>
    
    </DropdownButton>
            
                  </td>

                  <td className='img_parent'>
                    <img src={`${BASE_URL}/upload/${element.profile}`} alt="" />
                  </td>
                
                  <td>
                  <DropdownButton  title= { <i class="fa-solid fa-ellipsis-vertical"></i>}>
                  
                <Dropdown.Item >
                  <NavLink to={`/userprofile/${element._id}`} className="text-decoration-none">
                  <i class="fa-solid fa-eye" style={{color:"green"}}></i> <span>View</span>
                  </NavLink>
                  </Dropdown.Item>
                
      <Dropdown.Item >
        <NavLink to={`/edit/${element._id}`}>
        <i class="fa-solid fa-edit" style={{color:"blue"}}></i> <span>edit</span>

        </NavLink>
        </Dropdown.Item>
      <Dropdown.Item >
        <div onClick={()=>deleteuser(element._id)}>
        <i class="fa-solid fa-trash" style={{color:"red"}}></i> <span>delete</span>
        </div>
        </Dropdown.Item>
     
    </DropdownButton>
                  </td>
                </tr>
                      </>
                    )
                  }):<div className='no_data text-center'>No data found</div>
                }
           
              </tbody>
            </Table>
            <Paginations  handleprevious={handleprevious} 
          handleNext={handleNext}
          page={page}
          pagecount={pagecount}
          setpage={setpage}/>
          </Card>
        </div>
      </Row>
      <ToastContainer/>
    </div>
    </>
  )
}

export default Tables
import React, { useContext, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import "./edit.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { ToastContainer,toast } from 'react-toastify';
import Spiner from '../../components/Spinner/Spiner';
import "react-toastify/dist/ReactToastify.css";


import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';
import { editfunc, singleuserget } from '../../services/Apis';
import { BASE_URL } from '../../services/helper';
import { addData } from '../../components/context/ContextPro';

const Edit = () => {

  const navigate=useNavigate()
  const {setupdate}=useContext(addData)

  const [showspin,setshowspin]=useState(true)


    //status option
    //npm i react-select
    const option =[
        {value:'Active',label:"Active"},
        {value:'InActive',label:"inActive"},
    ]

    const [inputdata,setinputdata]=useState({
        fname:"",
        lname:"",
        email:"",
        mobile:"",
        gender:"",
        location:""
    })
    console.log(inputdata)

    const [status,setstatus]=useState("Active")
    const [image,setimage]=useState('')
    const [preview,setpreview]=useState("")
    const [imagedata,setimagedata]=useState("")

    
    
    //function for setinput values
    const setinputvalues=(e)=>{
      const {name,value}=e.target;
      setinputdata({...inputdata,[name]:value})
    }

    //STATUS SET FUNCTION
    const statusvalue=(e)=>{
      setstatus(e.value)
      console.log()
    }

    //functiion to give the path of image 
    const profile=(e)=>{
      setimage(e.target.files[0])
      console.log(e.target.files[0])
    }


    useEffect(()=>{
      if(image){
        setimagedata("")
        setpreview(URL.createObjectURL(image))
      }
      setTimeout(() => {
        setshowspin(false)
      }, 600);
  
    },[image])

    //submiting the user data 
    const submitUserData=async(e)=>{
      e.preventDefault()
      const {fname,lname,email,mobile,gender, location}=inputdata    
      if(fname==="" || fname.trim()===""){
        toast.error("firstname is requried")
      
      }
      else if(lname==="" || lname.trim()===""){
        toast.error("LastName is required")
      }
      else if(lname==="" || lname.trim()===""){
        toast.error("LastName is required")
      }
      else if(email==="" || email.trim()===""){
        toast.error("email is required")
       
      }
       else if(!email.includes("@")){
        toast.error("enter valid email @ is miss")
      }  
      else if(mobile==="" || mobile.trim()===""){
        toast.error("mobile NO is required")
      }
      else if(mobile.length>10  || mobile.length<10){
        toast.error("enter valid mobile!f")
      }
      else if(gender==="" || gender.trim()===""){
        toast.error("gender is required")
      }
      else if(location==="" || location.trim()===""){
        toast.error("location is required")
      }
     else if(status===""){
        toast.error("status is required")
      }
     else if(imagedata===""){
        toast.error("profile is required")
      }
      else{
        const data =new FormData();
        data.append("fname",fname)
        data.append("lname",lname)
        data.append("email",email)
        data.append("mobile",mobile)
        data.append("gender",gender)
        data.append("status",status)
        data.append("user_profile",image || imagedata)
        data.append("location",location)

        const config={
          "Content-Type":"multipart/form-data"
        }
        const response= await editfunc(id,data,config)
       if(response.status===200){
         setupdate(response.data)
        navigate("/")
       }

      }

    }

   
console.log(status)
    const {id} = useParams();
    console.log(id)
  
    const userprofileget=async()=>{
      const response=await singleuserget(id)
      if(response.status===200){
        setinputdata(response.data)
        setstatus(response.data.status)
        setimagedata(response.data.profile)
      }
    }
   
  
    useEffect(()=>{
    
      userprofileget()
    },[id])
    
    return (
      <>
      {
        showspin?<Spiner/>: <div className="container">
  
        <h2 className='text-center mt-1'>Update your detail</h2>
        <Card className='shadow mt-3n p-3'>
            <div className="profile_div text-center">
                <img src={image? preview:`${BASE_URL}/upload/${imagedata}`} alt="" />
            </div>
            <Form>
                <Row>
    
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name='fname' value={inputdata.fname} onChange={setinputvalues} placeholder='Enter FirstName'/>
          </Form.Group>
    
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name='lname' value={inputdata.lname} onChange={setinputvalues} placeholder='Enter LastName'/>
          </Form.Group>
    
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name='email' value={inputdata.email} onChange={setinputvalues} placeholder='Enter Email'/>
          </Form.Group>
    
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>Mobile</Form.Label>
            <Form.Control type="text" onChange={setinputvalues} name='mobile' value={inputdata.mobile} placeholder='Enter Mobile'/>
          </Form.Group>
    
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>Select Your gender</Form.Label>
            <Form.Check 
                type={"radio"}
                name='gender'
                label={"Male"}
                value={"Male"}
                checked={inputdata.gender==="Male"?true:false}
                onChange={setinputvalues}
                />
    
             <Form.Check 
                type={"radio"}
                name='gender'
                label={"Female"}
                checked={inputdata.gender==="Female"?true:false}
                value={"Female"}
                onChange={setinputvalues}
                />
          </Form.Group>
    
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>Select your Status</Form.Label>
            {/* npm i react-select */}
            <Select options={option} defaultValue={status} onChange={statusvalue}></Select>
          </Form.Group>
    
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>Select Your Profile</Form.Label>
            <Form.Control type="file" onChange={profile} name='user_profile'/>
          </Form.Group>
    
          <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
            <Form.Label>Enter Your Location</Form.Label>
            <Form.Control type="text" name='location' value={inputdata.location} onChange={setinputvalues} placeholder='Enter Your Location'/>
          </Form.Group>
    
          <Button variant="primary" type="submit" onClick={submitUserData}>
            Submit
          </Button>
                </Row>
        </Form>
        </Card>
    
        <ToastContainer
       position='top-center'/>
    
       </div>
    
      }   
        </>
  )
}

export default Edit

import React, { useContext, useEffect, useState } from 'react'
import "./home.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import  Alert  from 'react-bootstrap/Alert';
import { useNavigate} from "react-router-dom"
import Tables from '../../components/Tables/Tables';
import Spiner from '../../components/Spinner/Spiner';
import { addData } from '../../components/context/ContextPro';
import { deletefunction, usergetfunc } from '../../services/Apis';
import { toast } from 'react-toastify';



function Home() {
  const navigate=useNavigate()
  const adduser=()=>{
    navigate("/register")
  }
  
  const {useradd,setuseradd,update,setupdate,deleted,setdeleted}=useContext(addData)
  const [showspin,setshowspin]=useState(true)
  const [userdata,setuserdata]=useState([])
  const [search,setsearch]=useState("")
  const[gender,setgender]=useState("All")
  const [status,setstatus]=useState("All")
  const [oldnew,setoldnew]=useState("new")
  const [page,setpage]=useState(1)
  const [pagecount,setpagecount]=useState(0)
  
  console.log(search)
  console.log(gender)
   
console.log(pagecount)
  // console.log(pagecount)

  const userGet=async()=>{
    const response=await usergetfunc(search,gender,status,oldnew,page)
  
    if(response.status===200){
      setuserdata(response.data.allusers)
      setpagecount(response.data.pagination.pageCount)
    }else{
      console.log("error for get userdata")
    }
  }
  
  
  const deleteuser=async(id)=>{
  
    const response=await deletefunction(id)
console.log(response.data)
    if(response.status===200){
      setdeleted(response.data)
      userGet()
    }else{
      toast.error("error")
    }
  }
 
  //pagination
  //handle prev button
  const handleprevious=()=>{
    setpage(()=>{
      if(page==1)return page
      return page - 1
    })
  }

  //handlenext
  const handleNext=()=>{
    setpage(()=>{
      if(page==pagecount)return page
      return page + 1
    })
  }

  useEffect(()=>{
  
    userGet()
    setTimeout(() => {
      setshowspin(false)
    }, 600);
  },[search,gender,status,oldnew,page])
  
  useEffect(()=>{
  if(useradd){
    setTimeout(() => {
      setuseradd("")
    }, 5000);
  }
  else if(update){
    setTimeout(() => {
      setupdate("")
    }, 5000);
  }
  else{
    setTimeout(() => {
      setdeleted("")
    }, 5000);
  }
  },[useradd,update,deleted])
 

  //user delete 
  return (
    
    <>
   
    {
      useradd?<Alert variant="success" onClose={()=>setuseradd("")} dismissible>{useradd.data.fname.toUpperCase()} Successfully Saved</Alert>:""
    }
    {
      update?<Alert variant="primary" onClose={()=>setupdate("")} dismissible>{update.fname.toUpperCase()} Successfully Update</Alert>:""
    }
    {
      deleted?<Alert variant="danger" onClose={()=>setdeleted("")} dismissible>{deleted.fname.toUpperCase()} Successfully Delete</Alert>:""
    }
 
      <div className="container">
        <div className="main_div">
          {/* seach and btn */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>setsearch(e.target.value)}
            />
            <Button className='search_btn' variant="success">Search</Button>
          </Form>
            </div>

            <div className="add_btn">
            <Button onClick={adduser} variant="primary"> <strong>+</strong> Add </Button>

            </div>
          </div>

          {/* export , gender, status */}
          <div className='filter_div mt-5 d-flex justify-content-between flex-wrap'>
            <div className="export_csv">
              <Button className='export_btn'>Export To Csv</Button>
            </div>
            <div className='filter_gender'>
              <div className="filter">
                <h3>filter by gender</h3>
                <div className="gender d-flex justify-content-between">
                  <Form.Check
                  type={"radio"}
                  label={"all"}
                  name="gender"
                  value={"All"}
                  onChange={(e)=>setgender(e.target.value)}
                  defaultChecked
                  
                  />
                  <Form.Check
                  type={"radio"}
                  label={"Male"}
                  name="gender"
                  onChange={(e)=>setgender(e.target.value)}
                  value={"Male"}
                  
                  />
                  <Form.Check
                  type={"radio"}
                  label={"Female"}
                  name="gender"
                  onChange={(e)=>setgender(e.target.value)}
                  value={"Female"}
               
                  />
                </div>
              </div>
            </div>
            {/* sort by value  */}
            <div className="filter_newold">
              <h1>sort By value</h1>
       <DropdownButton className='' title= {<i class="fa-solid fa-sort"></i>}>
      <Dropdown.Item onClick={(e)=>setoldnew("new")}>New</Dropdown.Item>
      <Dropdown.Item onClick={(e)=>setoldnew("old")}>Old</Dropdown.Item>
    
    </DropdownButton>
            </div>

            {/* filter by status */}
            <div className="filter_status">
              <h3>Filter By Status</h3>
              <div className="status_radio d-flex justify-content-between">
              <Form.Check
                  type={"radio"}
                  label={"All"}
                  name="status"
                  value={"All"}
                  onChange={(e)=>setstatus(e.target.value)}
                  defaultChecked
                  
                  />
                  <Form.Check
                  type={"radio"}
                  label={"Active"}
                  name="status"
                  value={"Active"}
                  onChange={(e)=>setstatus(e.target.value)}
                  
                  />
                  <Form.Check
                  type={"radio"}
                  label={"InActive"}
                  name="status"
                  onChange={(e)=>setstatus(e.target.value)}
                  value={"InActive"}
               
                  />
              </div>
            </div>
          </div>
        </div>
        {
          showspin?<Spiner/>: <Tables userdata={userdata} 
          deleteuser={deleteuser} 
          userGet={userGet} 
          handleprevious={handleprevious} 
          handleNext={handleNext}
          page={page}
          pagecount={pagecount}
          setpage={setpage}
          />
        }
     
      </div>
    </>
  )
}

export default Home
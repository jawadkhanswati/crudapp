import React, { useEffect, useState } from 'react'
import "./profile.css"
import { Card,Row}  from 'react-bootstrap'
import Spiner from '../../components/Spinner/Spiner'
import { useParams } from 'react-router-dom'
import { singleuserget } from '../../services/Apis'
import { BASE_URL } from '../../services/helper'
import moment from "moment"

const Profile = () => {
  const [showspin,setshowspin]=useState(true)
  const [singledata,setsingledata]=useState([])

  const {id} = useParams();
  console.log(id)

  const userprofileget=async()=>{
    const response=await singleuserget(id)
    if(response.status===200){
      setsingledata(response.data)
    }
  }
  console.log(singledata)

  useEffect(()=>{
    setTimeout(() => {
      setshowspin(false)
    }, 500);
    userprofileget()
  },[id])
  return (
    <>
    {
      showspin?<Spiner/>:
      
     <div className="container">
      <Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
        <Card.Body>
          <Row>
            <div className="col">
              <div className="card-profile-stats d-flex justify-content-center">
                <img src={`${BASE_URL}/upload/${singledata.profile}`} alt="" />
              </div>
            </div>
          </Row>
          <div className='text-center'> 
         
              <>
            <h3>{singledata.fname + singledata.lname}</h3>
            <h4><i class="fa-solid fa-envelope email"></i>&nbsp;:-<span>{singledata.email}</span></h4>
            <h5><i class="fa-solid fa-mobile"></i>&nbsp;:-<span>{singledata.mobile}</span></h5>
            <h5><i class="fa-solid fa-location-pin location"></i>&nbsp;:-<span>{singledata.location}</span></h5>
            <h5>Status &nbsp;:-  <span>{singledata.status}</span></h5>
            <h5><i class="fa-solid fa-calendar-days calendar"></i>{moment(singledata.datecreated).format("DD-MM-YY")} &nbsp;:  <span>Active</span></h5>
            <h5><i class="fa-solid fa-calendar-days calendar"></i>{singledata.dateupdated} &nbsp;:  <span>Active</span></h5>
              </>
            
      
      </div>
        </Card.Body>
      </Card>
      </div> 
      
    }
    </>
  )
}

export default Profile

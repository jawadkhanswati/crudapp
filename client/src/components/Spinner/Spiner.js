import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

function Spiner() {
  return (
    <>
    <div className="d-flex justify-content-center align-items-center" style={{width:"100%",height:"50ch"}}>
    <Spinner animation="border" variant="dark" />&nbsp; Loading...
    </div>
    </>
  )
}

export default Spiner
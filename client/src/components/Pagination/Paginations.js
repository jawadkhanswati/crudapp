import React from 'react'
import  Pagination  from 'react-bootstrap/Pagination'

function Paginations({handleprevious,handleNext,page,pagecount,setpage}) {
  return (
    <>
    {
      pagecount>0? <div className="pagination_div d-flex justify-content-end mx-5">
      <Pagination>
        <Pagination.Prev onClick={()=>handleprevious()}/>
      {
        Array(pagecount).fill().map((element,index)=>{
          return<>
            <Pagination.Item onClick={()=>setpage(index+1)} active={page===index+1?true:false}>{index+1}</Pagination.Item>
          </>
        })
      }
      
        <Pagination.Next onClick={()=>handleNext()}/>
        
      </Pagination>
    </div>:""
    }
    </>
  )
}

export default Paginations
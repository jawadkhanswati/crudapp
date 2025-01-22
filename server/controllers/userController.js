
const moment = require("moment");
const users = require("../models/userSchema")

const userpost=async(req,res)=>{
   const file=req.file.filename;
   console.log(req.body)
   const {fname,lname,email,mobile ,gender,location,status}=req.body;
   if(!fname || !lname || !email || !mobile || !gender ||!location || !status || !file){
      return res.status(401).json("all input fileds are required")
   }
   try {
     const peruser=await users.findOne({email});
     if(peruser){
      res.status(401).json("This user already exists in server")
     }else{
      
      const datecreated=moment(new Date()).format("YYY-MMM-DD hh:mm:ss")

      const userdata=await users.create({
         fname,
         lname,
         email,
         mobile,
         gender,
         location,
         status,
         profile:file,
         datecreated
      })
    
      console.log()
      res.status(200).json(userdata)
     }
   } catch (error) {
      res.status(500).json({"error":error})
   }
}

//get all the users
const userget=async(req,res)=>{
   
   const search =req.query.search || ""

   const query={
      fname:{$regex:search,$options:"i"}
   }

   const gender=req.query.gender || ""
   if(gender!=="All"){
    query.gender=gender
   }

   const status=req.query.status||""
   if(status !== "All"){
      query.status=status
   }
   
   
   const sort =req.query.oldnew||""

   const page=req.query.page || 1
   const ITEM_PER_PAGE=4
   try {
      const count=await users.countDocuments(query)
     
      const skip=(page-1) * ITEM_PER_PAGE
      const allusers=await users.find(query).sort({datecreated:sort=="new"?-1:1}).limit(ITEM_PER_PAGE).skip(skip);
      const pageCount=Math.ceil(count/ITEM_PER_PAGE)
      res.status(200).json({allusers,pagination:{count,pageCount}})
   } catch (error) {
      res.status(401).json(error)
   }
}

//single user get view all data single user
const singleuserget=async(req,res)=>{
   const {id}=req.params;
   try {
      const userdata=await users.findOne({_id:id})
      res.status(200).json(userdata)
   } catch (error) {
      res.status(402).json(error)
   }
}

//useredit update the the data if user want
const useredit =async(req,res)=>{
   const {id}=req.params;
   const {fname,lname,email,mobile,gender,location,status,user_profile}=req.body
   const file=req.file?req.file.filename:user_profile;

   const dateupdated=moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
   try {
      const userupdate= await users.findByIdAndUpdate({_id:id},{
         fname,
         lname,
         email,
         mobile,
         gender,
         location,
         status,
         profile:file,
         dateupdated
      },{
         new:true
      })
      await userupdate.save()
      res.status(200).json(userupdate)
   } catch (error) {
      res.status(401).json(error)
   }
}

//delete user
const userdelete=async(req,res)=>{
   const {id}=req.params;
   console.log(id)
   try {
     const deleteuser= await users.findByIdAndDelete({_id:id})
     res.status(200).json(deleteuser)
   } catch (error) {
      res.status(401).json(error)
   }
}


//status update in home page for every unique user with id
const statusupdate=async(req,res)=>{
   const {id}=req.params;
   const {data}=req.body;

   try {      
     const userstatusupdate=await users.findByIdAndUpdate({_id:id},{status:data},{new:true});
      res.status(200).json({"success":userstatusupdate})
   } catch (error) {
      res.status(401).json(error)
   }
}

module.exports={userpost,userget,singleuserget,useredit,userdelete,statusupdate}
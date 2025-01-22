require("dotenv").config
const express=require("express");
const cors=require("cors");
const mongoconnecton = require("./db/connection");
const router = require("./routes/router");
//STARTING SERVER NODE --WATCH APP.JS

const app=express();
const port=800;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/upload",express.static("./uploads"))

//mongoose conection
mongoconnecton("mongodb://127.0.0.1:27017/crudapp")


app.use("/api",router)

app.listen(port,()=>{
    console.log("the server is listening on port " + port)
    
})
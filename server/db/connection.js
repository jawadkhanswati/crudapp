const mongoose=require("mongoose")

function mongoconnecton(url){
    const connection=mongoose.connect(url).then(e=>console.log("mongodb is connected"))
    return connection
}

module.exports=mongoconnecton

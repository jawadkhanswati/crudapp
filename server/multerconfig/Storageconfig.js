const multer = require("multer");

//multer storageconfilg
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        const filenam=`image-${Date.now()}-${file.originalname}`
        cb(null,filenam)
    }
});

// filefilter 
const filefilter=(req,file,callback)=>{
    if(file.mimetype==="image/png" || file.mimetype==="image/jpg" || file.mimetype==="image/jpeg"){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new Error("only .png .jpg & jpeg format allow"))
    }
};

const upload=multer({
    storage,
    filefilter
})

module.exports= upload
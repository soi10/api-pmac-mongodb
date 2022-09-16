const UploadController = require("../controllers/uploads");
const routerUpload = require("express").Router();
const multer = require("multer")
const uuidv4 = require("uuid")
const path = require("path")
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploadfile/')
    },
    filename: function(req,file,cb){   
        const newFilename = uuidv4.v4() + path.extname(file.originalname);
        cb(null,newFilename) 
        console.log("FileName",newFilename)
    }
})

const upload = multer({storage: storage,limits:{fileSize :10*1024*1024}});
routerUpload.post('/',upload.single('file') ,UploadController.upload );
//routerUpload.get("/", RegisDeviceController.findAll);

module.exports = routerUpload;
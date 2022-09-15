const ObjectId = require("mongodb").ObjectId;
const { regisDevice } = require("../models");
const db = require("../models");
const RegisDevice = db.regisDevice; 
module.exports = async (req,res,next) =>{
    const {secretkey} = req.body
    try{
        const data = await RegisDevice.findOne({'secretkey':secretkey});
        if(!data){
            throw 'Invalid user ID';
        }else{
        res.status(200);
        next();
        }
    }catch{
        res.status(401).json({
            error: new Error('Invalid reauest!')
        })
    }
}
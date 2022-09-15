const ObjectId = require("mongodb").ObjectId;
const db = require("../models");
const RegisDevice = db.regisDevice; 
var crypto = require('crypto');


const create = async (req, res) => {
    const {emp_code,emp_name,emp_last,depart} = req.body
    var secretkey = crypto.randomBytes(32).toString('hex');
        let add_RegisDevice = new RegisDevice({
            emp_code: emp_code,
            emp_name: emp_name,
            emp_last: emp_last,
            depart: depart,
            secretkey: secretkey
        });
        try {
          const dataToSave = await add_RegisDevice.save();
          res.status(200).json(dataToSave);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }

 
  };
  const findAll = async (req, res) => {
    try {
      const data = await RegisDevice.find();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  module.exports = {
    create,
    findAll
  };
  
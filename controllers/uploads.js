const ObjectId = require("mongodb").ObjectId;
const db = require("../models");
const uploads = db.uploadexcell; 
const multer = require("multer");

// const db = require("../../models");
// const Tutorial = db.tutorials;

const readXlsxFile = require("read-excel-file/node");

const upload = async (req, res, next) => {
    try {
      let path = req.file.path;
      var workbook = XLSX.readFile(path);
      var sheet_name_list = workbook.SheetNames;
      let jsonData = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      if (jsonData.length === 0) {
        return res.status(400).json({
          success: false,
          message: "xml sheet has no data",
        });
      }
      let savedData = await uploads.save(jsonData);
  
      return res.status(201).json({
        success: true,
        message: savedData.length + " rows added to the database",
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };
  
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploadsfile");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  const uploadss = multer({ storage: storage });

module.exports = {
  upload,
};

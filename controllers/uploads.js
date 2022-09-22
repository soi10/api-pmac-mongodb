const ObjectId = require("mongodb").ObjectId;
const db = require("../models");
const uploads = db.uploadexcell; 
const path = require('path');
const readXlsxFile = require('read-excel-file/node');
const XLSX = require('xlsx');

var fs = require('fs');
// upload and import excel file

exports.upload = async function(req, res, next) {
  try {
    let path = req.file.path;
    var workbook = XLSX.readFile(path);
    var sheet_name_list = workbook.SheetNames;
    let jsonData = XLSX.utils.sheet_to_row_object_array(
      workbook.Sheets[sheet_name_list[0]]
    );
    if (jsonData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "xml sheet has no data",
      });
    }
    let news = [];
    for (i=0; i<jsonData.length; i++) {
      let data = {
        mru: jsonData[i].MRU,
        mruname: jsonData[i].MRU.substr(0, 4),
        readnumber: jsonData[i].readnumber,
        ca: jsonData[i].ca,
        name: jsonData[i].name,
        address: jsonData[i].address,
        peano: jsonData[i].peano.replace(/^0+/, ''),
        phase: jsonData[i].phase,
        amp: jsonData[i].amp,
      }
      console.log("data",data);
      news.push(data); 
    }
    let savedData = await uploads.create(news);

    return res.status(201).json({
      success: true,
      message: savedData.length + " rows added to the database",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }

};
 

  
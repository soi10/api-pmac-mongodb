const ObjectId = require("mongodb").ObjectId;
const db = require("../../models");
const uploadexcell = db.uploadexcell;

const search = async (req, res) => {
  const peano = req.body.peano;

  if (!peano) {
    res.status(400).json({ message: "กรอก PEA มิเตอร์" });
  } else {
    try {
      const dataTosearch = await uploadexcell.find({
        peano: { $regex: peano },
      });
      res.status(200).json({
        ชื่อผู้ใช้ไฟฟ้า: dataTosearch[0].name,
        ที่อยู่: dataTosearch[0].address,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = {
  search,
};

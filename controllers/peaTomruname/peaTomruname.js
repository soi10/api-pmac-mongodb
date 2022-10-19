// const ObjectId = require("mongodb").ObjectId;
const db = require("../../models");
const peatomruname = db.peatomruname;

const search = async (req, res) => {
  const peaname = req.body.peaname;

  if (!peaname) {
    res.status(400).json({ message: "กรอก PEA มิเตอร์" });
  } else {
    try {
      const dataTosearch = await peatomruname.find({
        peaname: peaname,
      });
      res.status(200).json({
        data: dataTosearch[0].mruname,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

const getname = async (req, res) => {
  try {
    const data = await peatomruname.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  search,
  getname,
};

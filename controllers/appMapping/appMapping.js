const ObjectId = require("mongodb").ObjectId;
const db = require("../../models");
const appmapping = db.appmapping;

const create = async (req, res) => {
  const peano = req.body.peano;
  try {
    const dataToSave = await appmapping.find({ peano: peano });
    if (dataToSave.length == 0) {
      let info_appmapping = new appmapping({
        peacode: req.body.peacode,
        peano: req.body.peano,
        apptype: req.body.apptype,
        peanodata: [
          {
            pmacno: req.body.peanodata.pmacno,
            meter_size: req.body.peanodata.meter_size,
          },
        ],
      });
      try {
        const dataToSave = await info_appmapping.save();
        res.status(200).json(dataToSave);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } else {
      try {
        const updatedAppmapping = await appmapping.findOneAndUpdate(
          { peano: peano },
          {
            $push: {
              peanodata: [
                {
                  pmacno: req.body.peanodata.pmacno,
                  meter_size: req.body.peanodata.meter_size,
                },
              ],
            },
          },
          { new: true }
        );
        res.status(200).json(updatedAppmapping);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const data = await appmapping.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findId = async (req, res) => {
  try {
    const data = await appmapping.findById(req.query.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findIdAndUpdate = async (req, res) => {
  const filter = { _id: req.body.id };
  const update = {
    tsic: req.body.tsic,
    trsg: req.body.trsg,
    ca: req.body.ca,
    fullname: req.body.fullname,
    address: req.body.address,
  };

  try {
    let data = await appmapping.findOneAndUpdate(filter, update);
    data = await appmapping.findOne(filter);
    res.status(200).json({
      message: "success",
      data: data,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findDataMapping = async (req, res) => {
  try {
    const data = await appmapping.find(
      {
        peacode: req.query.peacode,
        apptype: req.query.APP_TYPE,
      },
      {
        tsic: 1,
        trsg: 1,
        ca: 1,
        fullname: 1,
        address: 1,
        peano: 1,
        apptype: 1,
        dateupdated: 1,
      }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const countMeterTypes = async (req, res) => {
  try {
    const data = await appmapping.aggregate([
      {
        $match: { peacode: req.body.peacode },
      },
      {
        $facet: {
          first: [
            {
              $match: {
                apptype: "1P2W (Direct)",
              },
            },
          ],
          second: [
            {
              $match: {
                apptype: "3P4W (Direct)",
              },
            },
          ],
          third: [
            {
              $match: {
                apptype: "1P2W With CT",
              },
            },
          ],
          four: [
            {
              $match: {
                apptype: "Smart meter 3P4W with CT",
              },
            },
          ],
          five: [
            {
              $match: {
                apptype: "CT Test",
              },
            },
          ],
          six: [
            {
              $match: {
                apptype: "6",
              },
            },
          ],
          seven: [
            {
              $match: {
                apptype: "",
              },
            },
          ],
        },
      },
      {
        $project: {
          A: {
            $size: "$first",
          },
          B: {
            $size: "$second",
          },
          C: {
            $size: "$third",
          },
          D: {
            $size: "$four",
          },
          E: {
            $size: "$five",
          },
          F: {
            $size: "$six",
          },
          G: {
            $size: "$seven",
          },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findDataId = async (req, res) => {
  try {
    const data = await appmapping.find(
      {
        _id: ObjectId(req.body.id),
      },
      {
        peanodata: {
          $elemMatch: {
            _id: ObjectId(req.body.iddata),
          },
        },
      }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  create,
  findAll,
  findDataMapping,
  countMeterTypes,
  findId,
  findIdAndUpdate,
  findDataId,
};

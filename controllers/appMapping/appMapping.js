const ObjectId = require("mongodb").ObjectId;
const db = require("../../models");
const appmapping = db.appmapping;
const uploadexcell = db.uploadexcell;
const uuidv4 = require("uuid");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

const create = async (req, res) => {
  const peano = req.body.peano;
  try {
    const dataToSave = await uploadexcell.find({
      peano: { $regex: peano },
    });
    if (dataToSave.length == 0) {
      let info_appmapping = new appmapping({
        peaname: req.body.peacode,
        peano: req.body.peano,
        apptype: req.body.apptype,
        sign_1: await saveImageToDisk(req.body.sign_1),
        sign_2: await saveImageToDisk(req.body.sign_2),
      });

      try {
        const dataToSave = await info_appmapping.save();
        res.status(200).json(dataToSave);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } else {
      let info_appmapping = new appmapping({
        peaname: req.body.peacode,
        peano: dataToSave[0].peano,
        ca: dataToSave[0].ca,
        fullname: dataToSave[0].name,
        address: dataToSave[0].address,
        meter_size: dataToSave[0].amp + " " + dataToSave[0].phase,
        apptype: req.body.apptype,
        sign_1: await saveImageToDisk(req.body.sign_1),
        sign_2: await saveImageToDisk(req.body.sign_2),
      });
      const dataToSave1 = await info_appmapping.save();
      try {
        res.status(200).json(dataToSave1);
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
  console.log(req.body.peacode);
  if (req.body.peacode == "Select") {
    try {
      const data = await appmapping.aggregate([
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
  } else {
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

//upload file
async function saveImageToDisk(baseImage) {
  //หา path จริงของโปรเจค
  const projectPath = path.resolve("./");
  //โฟลเดอร์และ path ของการอัปโหลด
  const uploadPath = `${projectPath}/uploads/`;

  //หานามสกุลไฟล์
  const ext = baseImage.substring(
    baseImage.indexOf("/") + 1,
    baseImage.indexOf(";base64")
  );

  //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
  let filename = "";
  if (ext === "svg+xml") {
    filename = `${uuidv4.v4()}.svg`;
  } else {
    filename = `${uuidv4.v4()}.${ext}`;
  }

  //Extract base64 data ออกมา
  let image = decodeBase64Image(baseImage);

  //เขียนไฟล์ไปไว้ที่ path
  await writeFileAsync(uploadPath + filename, image.data, "base64");
  //return ชื่อไฟล์ใหม่ออกไป
  return filename;
}

//decodebase64ToImage
function decodeBase64Image(base64Str) {
  var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var image = {};
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 string");
  }

  image.type = matches[1];
  image.data = matches[2];

  return image;
}

module.exports = {
  create,
  findAll,
  findDataMapping,
  countMeterTypes,
  findId,
  findIdAndUpdate,
  findDataId,
};

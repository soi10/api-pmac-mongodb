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
      peano: peano,
    });
    if (dataToSave.length == 0) {
      let info_appmapping = new appmapping({
        peano: req.body.peano,
        apptype: req.body.apptype,
        I_N: req.body.I_N,
        I_A: req.body.I_A,
        I_B: req.body.I_B,
        I_C: req.body.I_C,
        V_AN: req.body.V_AN,
        V_BN: req.body.V_BN,
        V_CN: req.body.V_CN,
        PF_A: req.body.PF_A,
        PF_B: req.body.PF_B,
        PF_C: req.body.PF_C,
        P_A: req.body.P_A,
        P_B: req.body.P_B,
        P_C: req.body.P_C,
        P_TOT: req.body.P_TOT,
        P_TOT_K: req.body.P_TOT_K,
        Q_A: req.body.Q_A,
        Q_B: req.body.Q_B,
        Q_C: req.body.Q_C,
        Q_TOT: req.body.Q_TOT,
        Q_TOT_K: req.body.Q_TOT_K,
        S_A: req.body.S_A,
        S_B: req.body.S_B,
        S_C: req.body.S_C,
        S_TOT: req.body.S_TOT,
        S_TOT_K: req.body.S_TOT_K,
        E_P_A: req.body.E_P_A,
        E_P_B: req.body.E_P_B,
        E_P_C: req.body.E_P_C,
        E_P_TOT: req.body.E_P_TOT,
        E_P_TOT_K: req.body.E_P_TOT_K,
        E_Q_A: req.body.E_Q_A,
        E_Q_B: req.body.E_Q_B,
        E_Q_C: req.body.E_Q_C,
        E_Q_TOT: req.body.E_Q_TOT,
        E_Q_TOT_K: req.body.E_Q_TOT_K,
        PF_SYS: req.body.PF_SYS,
        FREQ: req.body.FREQ,
        THD_I: req.body.THD_I,
        THD_V: req.body.THD_V,
        UNB_I: req.body.UNB_I,
        UNB_V: req.body.UNB_V,
        MT_SIZE: req.body.MT_SIZE,
        MT_REV_SPEC: req.body.MT_REV_SPEC,
        CT_SIZE: req.body.CT_SIZE,
        CT_RATIO: req.body.CT_RATIO,
        P_TOT_C093: req.body.P_TOT_C093,
        Q_TOT_C193: req.body.Q_TOT_C193,
        E_P_TOT_IMP: req.body.E_P_TOT_IMP,
        E_Q_TOT_IMP: req.body.E_Q_TOT_IMP,
        LF_EST: req.body.LF_EST,
        UNIT_EST: req.body.UNIT_EST,
        INSP_ROUND: req.body.INSP_ROUND,
        INSP_TIME: req.body.INSP_TIME,
        ERR_MT_A: req.body.ERR_MT_A,
        ERR_MT_TOT: req.body.ERR_MT_TOT,
        ERR_CT_BA: req.body.ERR_CT_BA,
        RESULT_MT: req.body.RESULT_MT,
        RESULT_CT: req.body.RESULT_CT,
        MONITOR_MT1: req.body.MONITOR_MT1,
        MONITOR_MT2: req.body.MONITOR_MT2,
        MONITOR_CT1: req.body.MONITOR_CT1,
        MONITOR_CT2: req.body.MONITOR_CT2,
        RESET_TIME: req.body.RESET_TIME,
        PMAC_NO: req.body.PMAC_NO,
        Username: req.body.Username,
        full_name: req.body.full_name,
        DepartmentShortName: req.body.DepartmentShortName,
        DepartmentFullName: req.body.DepartmentFullName,
        CostCenterCode: req.body.CostCenterCode,
        CostCenterName: req.body.CostCenterName,
        BaName: req.body.BaName,
        Peacode: req.body.Peacode,
        Peaname: req.body.Peaname,
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
        peano: req.body.peano,
        mru: dataToSave[0].mru,
        mruname: dataToSave[0].mruname,
        readnumber: dataToSave[0].readnumber,
        ca: dataToSave[0].ca,
        install: dataToSave[0].install,
        name: dataToSave[0].name,
        address: dataToSave[0].address,
        peano: dataToSave[0].peano,
        peoducer: dataToSave[0].peoducer,
        type: dataToSave[0].type,
        phase: dataToSave[0].phase,
        amp: dataToSave[0].amp,
        firtinstall: dataToSave[0].firtinstall,
        dateinstall: dataToSave[0].dateinstall,
        value: dataToSave[0].value,
        code: dataToSave[0].code,
        unitintall: dataToSave[0].unitintall,
        causeinstall: dataToSave[0].causeinstall,
        fullname: dataToSave[0].name,
        apptype: req.body.apptype,
        I_N: req.body.I_N,
        I_A: req.body.I_A,
        I_B: req.body.I_B,
        I_C: req.body.I_C,
        V_AN: req.body.V_AN,
        V_BN: req.body.V_BN,
        V_CN: req.body.V_CN,
        PF_A: req.body.PF_A,
        PF_B: req.body.PF_B,
        PF_C: req.body.PF_C,
        P_A: req.body.P_A,
        P_B: req.body.P_B,
        P_C: req.body.P_C,
        P_TOT: req.body.P_TOT,
        P_TOT_K: req.body.P_TOT_K,
        Q_A: req.body.Q_A,
        Q_B: req.body.Q_B,
        Q_C: req.body.Q_C,
        Q_TOT: req.body.Q_TOT,
        Q_TOT_K: req.body.Q_TOT_K,
        S_A: req.body.S_A,
        S_B: req.body.S_B,
        S_C: req.body.S_C,
        S_TOT: req.body.S_TOT,
        S_TOT_K: req.body.S_TOT_K,
        E_P_A: req.body.E_P_A,
        E_P_B: req.body.E_P_B,
        E_P_C: req.body.E_P_C,
        E_P_TOT: req.body.E_P_TOT,
        E_P_TOT_K: req.body.E_P_TOT_K,
        E_Q_A: req.body.E_Q_A,
        E_Q_B: req.body.E_Q_B,
        E_Q_C: req.body.E_Q_C,
        E_Q_TOT: req.body.E_Q_TOT,
        E_Q_TOT_K: req.body.E_Q_TOT_K,
        PF_SYS: req.body.PF_SYS,
        FREQ: req.body.FREQ,
        THD_I: req.body.THD_I,
        THD_V: req.body.THD_V,
        UNB_I: req.body.UNB_I,
        UNB_V: req.body.UNB_V,
        MT_SIZE: dataToSave[0].amp + " " + dataToSave[0].phase,
        MT_REV_SPEC: req.body.MT_REV_SPEC,
        CT_SIZE: req.body.CT_SIZE,
        CT_RATIO: req.body.CT_RATIO,
        P_TOT_C093: req.body.P_TOT_C093,
        Q_TOT_C193: req.body.Q_TOT_C193,
        E_P_TOT_IMP: req.body.E_P_TOT_IMP,
        E_Q_TOT_IMP: req.body.E_Q_TOT_IMP,
        LF_EST: req.body.LF_EST,
        UNIT_EST: req.body.UNIT_EST,
        INSP_ROUND: req.body.INSP_ROUND,
        INSP_TIME: req.body.INSP_TIME,
        ERR_MT_A: req.body.ERR_MT_A,
        ERR_MT_TOT: req.body.ERR_MT_TOT,
        ERR_CT_BA: req.body.ERR_CT_BA,
        RESULT_MT: req.body.RESULT_MT,
        RESULT_CT: req.body.RESULT_CT,
        MONITOR_MT1: req.body.MONITOR_MT1,
        MONITOR_MT2: req.body.MONITOR_MT2,
        MONITOR_CT1: req.body.MONITOR_CT1,
        MONITOR_CT2: req.body.MONITOR_CT2,
        RESET_TIME: req.body.RESET_TIME,
        PMAC_NO: req.body.PMAC_NO,
        Username: req.body.Username,
        full_name: req.body.full_name,
        DepartmentShortName: req.body.DepartmentShortName,
        DepartmentFullName: req.body.DepartmentFullName,
        CostCenterCode: req.body.CostCenterCode,
        CostCenterName: req.body.CostCenterName,
        BaName: req.body.BaName,
        Peacode: req.body.Peacode,
        Peaname: req.body.Peaname,
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

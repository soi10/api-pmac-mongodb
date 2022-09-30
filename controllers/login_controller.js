const axios = require("axios");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  var data =
    `<?xml version="1.0" encoding="utf-8"?>\r\n  
                  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\r\n   
                    <soap:Body>\r\n    
                      <Login xmlns="http://idm.pea.co.th/">\r\n     
                        <request>\r\n       
                          <InputObject>\r\n          
                            <Username>` +
    req.body.username +
    `</Username>\r\n           
                            <Password>` +
    req.body.password +
    `</Password>\r\n       
                          </InputObject>\r\n        
                          <WSAuthenKey>e3358fc1-99ad-4b21-8237-7c9c8ba1c5dc</WSAuthenKey>\r\n      
                        </request>\r\n    
                      </Login>\r\n  
                    </soap:Body>\r\n
                  </soap:Envelope>`;
  var config = {
    method: "post",
    url: "https://idm.pea.co.th/webservices/IdmServices.asmx",
    headers: {
      "Content-Type": "text/xml",
    },
    data: data,
  };

  let resp = await axios(config)
    .then(function (response) {
      // console.log(response.data)
      let xmlParser = require("xml2json");
      let LoginresponseJson = JSON.parse(xmlParser.toJson(response.data));
      let LoginResponseCode =
        LoginresponseJson["soap:Envelope"]["soap:Body"]["LoginResponse"][
          "LoginResult"
        ];
      // let LoginresponseText = LoginresponseJson["soap:Envelope"]["soap:Body"]["LoginResponse"]["LoginResult"]["ResultObject"]["Result"];
      return LoginResponseCode;
    })
    .catch(function (error) {
      return error;
    });
  // return resp

  // res.json({
  //     data: resp.ResponseMsg,
  // });

  if (resp.ResponseMsg === "Success") {
    var data =
      `<?xml version="1.0" encoding="utf-8"?>
                  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                  <soap:Body>
                    <GetEmployeeInfoByEmployeeId xmlns="http://idm.pea.co.th/">
                      <request>
                        <InputObject>
                          <EmployeeId>` +
      req.body.username +
      `</EmployeeId>
                          </InputObject>
                        <WSAuthenKey>93567815-dfbb-4727-b4da-ce42c046bfca</WSAuthenKey>
                        </request>
                      </GetEmployeeInfoByEmployeeId>
                    </soap:Body>
                  </soap:Envelope>`;

    var config2 = {
      method: "post",
      url: "https://idm.pea.co.th/webservices/EmployeeServices.asmx",
      headers: {
        "Content-Type": "text/xml",
      },
      data: data,
    };

    let Username = await axios(config2)
      .then(function (response) {
        // console.log(response.data)
        let xmlParser = require("xml2json");
        let LoginresponseJson = JSON.parse(xmlParser.toJson(response.data));
        let LoginresponseText =
          LoginresponseJson["soap:Envelope"]["soap:Body"][
            "GetEmployeeInfoByEmployeeIdResponse"
          ]["GetEmployeeInfoByEmployeeIdResult"]["ResultObject"]["Username"];
        return LoginresponseText;
      })
      .catch(function (error) {
        return error;
      });

    let FirstName = await axios(config2)
      .then(function (response) {
        // console.log(response.data)
        let xmlParser = require("xml2json");
        let LoginresponseJson = JSON.parse(xmlParser.toJson(response.data));
        let LoginresponseText =
          LoginresponseJson["soap:Envelope"]["soap:Body"][
            "GetEmployeeInfoByEmployeeIdResponse"
          ]["GetEmployeeInfoByEmployeeIdResult"]["ResultObject"]["FirstName"];
        return LoginresponseText;
      })
      .catch(function (error) {
        return error;
      });
    let LastName = await axios(config2)
      .then(function (response) {
        // console.log(response.data)
        let xmlParser = require("xml2json");
        let LoginresponseJson = JSON.parse(xmlParser.toJson(response.data));
        let LoginresponseText =
          LoginresponseJson["soap:Envelope"]["soap:Body"][
            "GetEmployeeInfoByEmployeeIdResponse"
          ]["GetEmployeeInfoByEmployeeIdResult"]["ResultObject"]["LastName"];
        return LoginresponseText;
      })
      .catch(function (error) {
        return error;
      });
    let DepartmentShortName = await axios(config2)
      .then(function (response) {
        // console.log(response.data)
        let xmlParser = require("xml2json");
        let LoginresponseJson = JSON.parse(xmlParser.toJson(response.data));
        let LoginresponseText =
          LoginresponseJson["soap:Envelope"]["soap:Body"][
            "GetEmployeeInfoByEmployeeIdResponse"
          ]["GetEmployeeInfoByEmployeeIdResult"]["ResultObject"][
            "DepartmentShortName"
          ];
        return LoginresponseText;
      })
      .catch(function (error) {
        return error;
      });

    let DepartmentFullName = await axios(config2)
      .then(function (response) {
        // console.log(response.data)
        let xmlParser = require("xml2json");
        let LoginresponseJson = JSON.parse(xmlParser.toJson(response.data));
        let LoginresponseText =
          LoginresponseJson["soap:Envelope"]["soap:Body"][
            "GetEmployeeInfoByEmployeeIdResponse"
          ]["GetEmployeeInfoByEmployeeIdResult"]["ResultObject"][
            "DepartmentFullName"
          ];
        return LoginresponseText;
      })
      .catch(function (error) {
        return error;
      });
    let BaName = await axios(config2)
      .then(function (response) {
        // console.log(response.data)
        let xmlParser = require("xml2json");
        let LoginresponseJson = JSON.parse(xmlParser.toJson(response.data));
        let LoginresponseText =
          LoginresponseJson["soap:Envelope"]["soap:Body"][
            "GetEmployeeInfoByEmployeeIdResponse"
          ]["GetEmployeeInfoByEmployeeIdResult"]["ResultObject"]["BaName"];
        return LoginresponseText;
      })
      .catch(function (error) {
        return error;
      });
    let CostCenterCode = await axios(config2)
      .then(function (response) {
        // console.log(response.data)
        let xmlParser = require("xml2json");
        let LoginresponseJson = JSON.parse(xmlParser.toJson(response.data));
        let LoginresponseText =
          LoginresponseJson["soap:Envelope"]["soap:Body"][
            "GetEmployeeInfoByEmployeeIdResponse"
          ]["GetEmployeeInfoByEmployeeIdResult"]["ResultObject"][
            "CostCenterCode"
          ];
        return LoginresponseText;
      })
      .catch(function (error) {
        return error;
      });
    let CostCenterName = await axios(config2)
      .then(function (response) {
        // console.log(response.data)
        let xmlParser = require("xml2json");
        let LoginresponseJson = JSON.parse(xmlParser.toJson(response.data));
        let LoginresponseText =
          LoginresponseJson["soap:Envelope"]["soap:Body"][
            "GetEmployeeInfoByEmployeeIdResponse"
          ]["GetEmployeeInfoByEmployeeIdResult"]["ResultObject"][
            "CostCenterName"
          ];
        return LoginresponseText;
      })
      .catch(function (error) {
        return error;
      });
    let Peacode = await axios(config2)
      .then(function (response) {
        // console.log(response.data)
        let xmlParser = require("xml2json");
        let LoginresponseJson = JSON.parse(xmlParser.toJson(response.data));
        let LoginresponseText =
          LoginresponseJson["soap:Envelope"]["soap:Body"][
            "GetEmployeeInfoByEmployeeIdResponse"
          ]["GetEmployeeInfoByEmployeeIdResult"]["ResultObject"]["Peacode"];
        return LoginresponseText;
      })
      .catch(function (error) {
        return error;
      });
    let Peaname = await axios(config2)
      .then(function (response) {
        // console.log(response.data)
        let xmlParser = require("xml2json");
        let LoginresponseJson = JSON.parse(xmlParser.toJson(response.data));
        let LoginresponseText =
          LoginresponseJson["soap:Envelope"]["soap:Body"][
            "GetEmployeeInfoByEmployeeIdResponse"
          ]["GetEmployeeInfoByEmployeeIdResult"]["ResultObject"]["Peaname"];
        return LoginresponseText;
      })
      .catch(function (error) {
        return error;
      });
    let Peaname1 = await axios(config2)
      .then(function (response) {
        // console.log(response.data)
        let xmlParser = require("xml2json");
        let LoginresponseJson = JSON.parse(xmlParser.toJson(response.data));
        let LoginresponseText =
          LoginresponseJson["soap:Envelope"]["soap:Body"][
            "GetEmployeeInfoByEmployeeIdResponse"
          ]["GetEmployeeInfoByEmployeeIdResult"]["ResultObject"]["Peaname1"];
        return LoginresponseText;
      })
      .catch(function (error) {
        return error;
      });
    // return resp
    const dataUser = {
      Username: Username,
      FirstName: FirstName,
      LastName: LastName,
      DepartmentShortName: DepartmentShortName,
      DepartmentFullName: DepartmentFullName,
      BaName: BaName,
      CostCenterCode: CostCenterCode,
      CostCenterName: CostCenterName,
      Peacode: Peacode,
      Peaname: Peaname,
      Peaname1: Peaname1,
    };

    const token = jwt.sign({ dataUser }, "cdscasddjosak213123312");
    res.json({
      statusCode: 200,
      status: "Success",
      token: token,
      user: dataUser,
    });
  } else {
    res.json({
      statusCode: 401,
      status: "false",
    });
  }
};
module.exports = {
  userLogin,
};
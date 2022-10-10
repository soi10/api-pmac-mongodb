// const moment = require("moment-timezone");
// const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

const { stringify } = require("uuid");

module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    Username: { type: String, default: "" },
    FirstName: { type: String, default: "" },
    LastName: { type: String, default: "" },
    BaName: { type: String, default: "" },
    IPAddress: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
  });
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const LogLogin = mongoose.model("LogLogin", schema);
  return LogLogin;
};

// const moment = require("moment-timezone");
// const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        emp_code: { type: String, default: "" },
        emp_name: { type: String, default: "" },
        emp_last: { type: String, default: "" },
        depart: { type: String, default: "" },
        secretkey: { type: String, default: "" },
        createdAt: { type: Date, default: Date.now },
      },
    );
    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const regisDevice = mongoose.model("regisDevice", schema);
    return regisDevice;
  };
  
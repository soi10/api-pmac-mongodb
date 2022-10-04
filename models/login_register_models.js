// const moment = require("moment-timezone");
// const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        fullname: { type: String, default: "" },
        email: { type: String, default: "" },
        password: { type: String, default: "" },
        createdAt: { type: Date, default: Date.now },
      },
    );
    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const loginregis = mongoose.model("loginregis", schema);
    return loginregis;
  };
  
// const moment = require("moment-timezone");
// const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        mru: { type: String, default: "" },
        ca: { type: String, default: "" },
        name: { type: String, default: "" },
        address: { type: String, default: "" },
        peano: { type: String, default: "" },
        phase: { type: String, default: "" },
        amp: { type: String, default: "" },
        createdAt: { type: Date, default: Date.now },
      },
    );
    schema.method("toJSON", function () {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const uploadexcell = mongoose.model("meterinstall", schema);
    return uploadexcell;
  };
  
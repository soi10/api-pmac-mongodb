// const moment = require("moment-timezone");
// const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      peacode: { type: String, default: "" },
      tsic: { type: String, default: "" },
      trsg: { type: String, default: "" },
      ca: { type: String, default: "" },
      fullname: { type: String, default: "" },
      address: { type: String, default: "" },
      peano: { type: String, default: "" },
      apptype: { type: String, default: "" },
      dateupdated: { type: Date, default: Date.now },
      peanodata: [
        {
          _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
          pmacno: { type: String, default: "" },
          meter_size: { type: String, default: "" },
          ctsize: { type: String, default: "" },
          recspec: { type: String, default: "" },
          insp_round: { type: String, default: "" },
          i_n: { type: String, default: "" },
          i_a: { type: String, default: "" },
          i_b: { type: String, default: "" },
          i_c: { type: String, default: "" },
          v_a: { type: String, default: "" },
          v_b: { type: String, default: "" },
          v_c: { type: String, default: "" },
          i_diff: { type: String, default: "" },
          pf_a: { type: String, default: "" },
          pf_b: { type: String, default: "" },
          pf_c: { type: String, default: "" },
          insp_time: { type: String, default: "" },
          energy_a: { type: String, default: "" },
          percent_err_a: { type: String, default: "" },
          test_result: { type: String, default: "" },
          kw_tot: { type: String, default: "" },
          load_factor: { type: String, default: "" },
          avg_unit: { type: String, default: "" },
          percent_err_total: { type: String, default: "" },
          kw_093: { type: String, default: "" },
          v_unb: { type: String, default: "" },
          i_unb: { type: String, default: "" },
          sign_1: { type: String, default: "" },
          sign_2: { type: String, default: "" },
          createdAt: { type: Date, default: Date.now },
        },
      ],
    },
    { _id: false }
  );
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const appmapping = mongoose.model("appMapping", schema);
  return appmapping;
};

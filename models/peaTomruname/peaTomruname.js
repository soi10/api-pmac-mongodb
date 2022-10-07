module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      peaname: { type: String, default: "" },
      mruname: { type: String, default: "" },
    },
    { _id: false }
  );
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const peaTomruname = mongoose.model("peaTomruname", schema);
  return peaTomruname;
};

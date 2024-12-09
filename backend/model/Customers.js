const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      max: 200,
    },
    phone: {
      type: String,
      required: false,
      max: 10000,
    },
    companyName:{
      type:String,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customers", customersSchema);

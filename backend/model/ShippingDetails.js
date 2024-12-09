const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shippingDetails = new Schema(
  {
    sl: {
      type: Number,
      required: true,
      default: null,
    },
    time: {
      type: String,
      required: true,
      default: null,
    },
    shippingmark: {
      type: String,
      required: true,
      default: null,
    },
    tctn: {
        type: Number,
        required: true,
        default: null,
      },
    description: {
        type: String,
        required: true,
        default: null,
    },
    cartonno: {
        type: String,
        required: true,
        default: null,
      },
      ctn: {
        type: Number,
        required: true,
        default: null,
      },
      gwctn: {
        type: Number,
        required: true,
        default: null,
      },
      qtyctn: {
        type: Number,
        required: true,
        default: null,
      },
      cbm: {
        type: Number,
        required: true,
        default: null,
      },
      jobid: {
        type: String,
        required: true,
      },
      deliveryStatus:{
        type:Boolean,
        default:false
      }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShippingDetails", shippingDetails);

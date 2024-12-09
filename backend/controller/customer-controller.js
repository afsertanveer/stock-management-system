const { default: mongoose } = require("mongoose");
const { json } = require("express");
const { ObjectId } = require("mongodb");
const Customers = require("../model/Customers");
const addCustomer = async (req, res, next) => {
  // console.log(req.body);
  // return;
  const { name, mobile, company } = req.body;
  const customer = new Customers({
    name: name,
    phone: mobile,
    companyName:company,
    status: true,
  });
  try {
    const doc = await customer.save();
  } catch (err) {
    return res.status(500).json("Something went wrong!");
  }
  return res.status(201).json(customer);
};
const ShowCustomers = async (req, res, next) => {
  let data;
  try {
    data = await Customers.find({});
  } catch (err) {
    return res.status(500).json("Something went wrong!");
  }
  return res.status(201).json(data);
};

exports.addCustomer = addCustomer;
exports.ShowCustomers = ShowCustomers;

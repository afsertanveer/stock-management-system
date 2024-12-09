const { default: mongoose } = require("mongoose");
const { json } = require("express");
const { ObjectId } = require("mongodb");
const Customers = require("../model/Customers");
const ShippingDetails = require("../model/ShippingDetails");
const xlsx = require("xlsx");


const addShipment = async(req,res,next) => {
    const { sl,time,shippingmark,tctn,description,cartonno,ctn,gwctn,qtyctn,cbm } = req.body;
    const shipment = new ShippingDetails({
      sl: sl,
      time: time,
      item: shippingmark,
      tctn:tctn,
      description:description,
      cartonno:cartonno,
      ctn:ctn,
      gwctn:gwctn,
      qtyctn:qtyctn,
      cbm:cbm,
    });
    try {
      const doc = await shipment.save();
    } catch (err) {
      return res.status(500).json("Something went wrong aaa!");
    }
    return res.status(201).json(shipment);
}

function getDataAfterHeader(filePath, headerName) {
    try {
      // Load the workbook
      const workbook = xlsx.readFile(filePath);
  
      // Select the first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
  
      // Convert the sheet to an array of rows
      const allRows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  
      // Find the row number where the header (e.g., "SL") is located
      let headerRowIndex = -1;
      allRows.forEach((row, index) => {
        if (row.includes(headerName)) {
          headerRowIndex = index;
        }
      });
  
      if (headerRowIndex === -1) {
        // console.log(`Header "${headerName}" not found.`);
        return [];
      }
  
    //   console.log(`Header "${headerName}" found at row ${headerRowIndex + 1}.`);
  
      // Extract the headers and data
      const headers = allRows[headerRowIndex];
      const dataRows = allRows.slice(headerRowIndex + 1);
  
      // Map data to JSON objects based on headers
      const jsonData = dataRows.map((row) => {
        const obj = {};
        headers.forEach((header, colIndex) => {
          obj[header] = row[colIndex];
        });
        return obj;
      });
      return jsonData;
    } catch (error) {
      console.error("Error reading Excel file:", error);
    }
  }
  const normalizeHeaders = (record) => {
    const normalized = {};
    for (const key in record) {
      const newKey = key
        .toLowerCase() // Convert to lowercase
        .replace(/\s+/g, '') // Replace spaces with underscores
        .replace(/[^\w_]/g, ''); // Remove special characters
      normalized[newKey] = record[key];
    }
    return normalized;
  };
  const trimValues = (record) => {
    const trimmedRecord = {};
    Object.keys(record).forEach((key) => {
      const value = record[key];
      // Trim value if it's a string
      trimmedRecord[key] = typeof value === 'string' ? value.trim() : value;
    });
    return trimmedRecord;
  };
  const trimArrayValues = (records) => records.map(trimValues);


const uploadFile = async(req,res,next) => {
    const file = req.file;
    const jobid = req.body.name;
    let filePath;
    if (file) {
        filePath = "uploads/".concat(file.filename);
    }
    // return res.status(200).json(filePath);
    let datas = getDataAfterHeader(filePath, "SL");

    datas.forEach((data , index) => {
        if(index > 0){
            if(data.CBM == undefined)data.CBM = datas[index-1].CBM;
            if(data['T.CTN'] == undefined)data['T.CTN'] = datas[index-1]['T.CTN'];
        }
    });
    datas = datas.map(normalizeHeaders);
    datas = trimArrayValues(datas);
    let allEntry = [];
    for (let i = 1; i < datas.length; i++) {
        let entry = {};
        entry["sl"] = datas[i].sl;
        entry["time"] = datas[i].time;
        entry["shippingmark"] = datas[i].shippingmark;
        entry["tctn"] = datas[i].tctn;
        entry["description"] = datas[i].description;
        entry["cartonno"] = datas[i].cartonno;
        entry["ctn"] = datas[i].ctn;
        entry["gwctn"] = datas[i].gwctn;
        entry["qtyctn"] = datas[i].qtyctn;
        entry["cbm"] = datas[i].cbm;
        entry["jobid"] = jobid;
        allEntry.push(entry);
    }
    // console.log(allEntry)
    let doc;
    try {
      doc = await ShippingDetails.insertMany(allEntry, { ordered: false });
    } catch (err) {
      return res.status(500).json(err);
    }
    // console.log(datas);
    return res.status(200).json(doc);
}

const viewShipment = async(req,res,next) => {
    const jobid = req.query.jobId;
    let data = [];
    try {
      data = await ShippingDetails.find({jobid:jobid});
    } catch (err) {
      return res.status(500).json(err);
    }
    if(data.length == 0)return res.status(200).json("No data found.");
    return res.status(200).json(data);
}
const getDistinctJobIds = async (req,res,next) => {
  let jobIds;
  try {
    // Get distinct names
    jobIds= await ShippingDetails.distinct('jobid');

  } catch (err) {
    return res.status(500).json('Error getting distinct data:', err);
  }
  return res.status(200).json(jobIds)
};
const getDistinctCustomer= async (req,res,next) => {
  let customers;
  try {
    // Get distinct names
    customers= await ShippingDetails.find({jobid:req.query.jobId}).distinct('shippingmark');

  } catch (err) {
    return res.status(500).json('Error getting distinct data:', err);
  }
  // console.log(customers)
  return res.status(200).json(customers)
};
const getCartoons= async (req,res,next) => {
  let cartoons;
  try {
    // Get distinct names
    cartoons= await ShippingDetails.find({shippingmark:req.query.customer});

  } catch (err) {
    return res.status(500).json('Error getting distinct data:', err);
  }
  // console.log(cartoons)
  return res.status(200).json(cartoons)
};
const updateStatus= async (req, res) => {
  const { jobId, shippingMark, cartonNo } = req.body;

  try {
    // Find the cartoon by jobId, shippingMark, and cartonNo
    const cartoon = await ShippingDetails.findOne({ jobid:jobId, shippingMark, cartonNo });

    // Check if cartoon exists
    if (!cartoon) {
      return res.status(404).json({ message: 'Cartoon not found' });
    }

    // Update deliveryStatus to true
    cartoon.deliveryStatus = true;

    // Save the updated cartoon entry
    await cartoon.save();

    // Return success response
    res.status(200).json({ message: 'Cartoon delivery status updated successfully', cartoon });
  } catch (error) {
    console.error('Error updating cartoon:', error);
    res.status(500).json({ message: 'Error updating cartoon', error });
  }
}

exports.addShipment = addShipment;
exports.uploadFile = uploadFile;
exports.viewShipment = viewShipment;
exports.getDistinctJobIds = getDistinctJobIds;
exports.getDistinctCustomer = getDistinctCustomer;
exports.getCartoons = getCartoons;
exports.updateStatus = updateStatus;

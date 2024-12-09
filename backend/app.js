 require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const app = express();
// const cors = require("./utilities/cors");
const cors = require('cors');
// cors(app);
app.use(cors())
app.use(express.json());

const customerRouter = require("./routes/customer-routes");
const shippingRouter = require("./routes/shipping-routes");

app.use("/api/customer", customerRouter);
app.use("/api/shipping", shippingRouter);
mongoose
  .connect(
    "mongodb+srv://stock:mjftLnpOOR31xOLh@cluster0.vkocg.mongodb.net/"
  )
  .then(() => {
    console.log("Connection Successful")
  })
  .catch((err) => console.log(err));
  

app.listen(5011, () => {
  console.log("Listening to 5011");
});
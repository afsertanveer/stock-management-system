const express = require('express');
const router = express.Router();
const {addCustomer,ShowCustomers} = require('../controller/customer-controller');
router.post(
    '/addCustomer', addCustomer
  )
router.get(
    '/show', ShowCustomers
  )
  
  module.exports = router;
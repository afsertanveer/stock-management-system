import axios from "axios";
import React, { useState } from "react";
import Menu from "../common/Menu";

const AddCustomer = () => {
  console.log("check: ", import.meta.env.VITE_API_LINK);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    company: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Customer Data Submitted:", formData);

    try {
      const response = await axios.post(
        "http://localhost:5011/api/customer/addCustomer",
        formData
      );
      console.log(response.data);
      setFormData({ name: "", mobile: "", company: "" });
      alert("Customer added successfully!");
    } catch (error) {
      console.error("Error adding customer:", error);
      alert("Failed to add customer. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-4 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 min-h-screen">
      <Menu />
      <div className="col-span-3 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            Add Customer
          </h2>

          {/* Name Input */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter customer name"
              className="w-full px-4 py-2 border rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Mobile Number Input */}
          <div className="mb-6">
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="w-full px-4 py-2 border rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Company Name Input */}
          <div className="mb-6">
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full px-4 py-2 border rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg shadow-md font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            Add Customer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;

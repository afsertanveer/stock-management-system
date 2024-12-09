import axios from "axios";
import React, { useState } from "react";
import Menu from "../common/Menu";

const PackageListReaderForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("file", formData.file);

    try {
      const response = await axios.post(
        "http://localhost:5011/api/shipping/uploadFile",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Form submitted successfully!");
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to submit the form. Please try again.");
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
            Add Package List
          </h2>

          {/* Name Input */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Job Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter job name"
              className="w-full px-4 py-2 text-black border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* File Input */}
          <div className="mb-6">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload File
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleChange}
              accept=".xlsx"
              className="w-full px-4 py-2 text-sm text-black border rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-2 text-xs text-gray-500">
              Only .xlsx files are allowed.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg shadow-md font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PackageListReaderForm;

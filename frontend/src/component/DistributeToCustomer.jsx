import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../common/Loader"; // Assuming you have a Loader component
import Menu from "../common/Menu";

const DistributeToCustomer = () => {
  const [jobIds, setJobIds] = useState([]); // List of job IDs
  const [selectedJobId, setSelectedJobId] = useState(""); // Selected Job ID
  const [customers, setCustomers] = useState([]); // List of customers
  const [selectedCustomer, setSelectedCustomer] = useState(""); // Selected customer
  const [cartoons, setCartoons] = useState([]); // List of cartoons
  const [selectedCartoon, setSelectedCartoon] = useState(""); // Selected cartoon
  const [bill, setBill] = useState(""); // Bill amount
  const [paid, setPaid] = useState(""); // Paid amount
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state to handle API errors

  // Fetch job IDs on component mount
  useEffect(() => {
    setIsLoading(true); // Start loading when fetching data
    axios
      .get(import.meta.env.VITE_API_URL + "api/shipping/jobIds") // Replace with correct endpoint
      .then(({ data }) => {
        setJobIds(data);
        setIsLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching job IDs:", error);
        setIsLoading(false);
        setError("Failed to load Job IDs.");
      });
  }, []);

  // Fetch customers when a Job ID is selected
  useEffect(() => {
    if (selectedJobId) {
      setIsLoading(true);
      axios
        .get(import.meta.env.VITE_API_URL + "api/shipping/customers", {
          params: { jobId: selectedJobId },
        })
        .then(({ data }) => {
          setCustomers(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching customers for Job ID:", error);
          setIsLoading(false);
          setError("Failed to load customers.");
        });
    }
  }, [selectedJobId]);

  // Fetch cartoons when a Customer is selected
  useEffect(() => {
    if (selectedCustomer) {
      setIsLoading(true);
      axios
        .get(import.meta.env.VITE_API_URL + "api/shipping/cartoons", {
          params: { customer: selectedCustomer },
        })
        .then(({ data }) => {
          console.log(data);
          setCartoons(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching cartoons for customer:", error);
          setIsLoading(false);
          setError("Failed to load cartoons.");
        });
    }
  }, [selectedCustomer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading when submitting form
    const payload = {
      jobId: selectedJobId,
      shippingmark: selectedCustomer,
      cartoonno: selectedCartoon,
      bill,
      paid,
    };

    axios
      .put(import.meta.env.VITE_API_URL + "api/shipping/updatecartoon", payload)
      .then(() => {
        alert("Data distributed successfully!");
        setIsLoading(false); // Stop loading after successful submission
        // Reset form
        setSelectedJobId("");
        setSelectedCustomer("");
        setSelectedCartoon("");
        setBill("");
        setPaid("");
      })
      .catch((error) => {
        console.error("Error submitting distribute to customer form:", error);
        setIsLoading(false);
        setError("Failed to submit distribution.");
      });
  };

  return (
    <div className="grid grid-cols-6 min-h-screen bg-gradient-to-r from-green-100 via-blue-100 to-purple-100">
      {/* Menu Component */}
      <div>
        <Menu />
      </div>

      {/* Main Content */}
      <div className="col-span-5 flex justify-center items-center">
        <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Distribute to Customer
          </h2>

          {/* Show error message if any */}
          {error && (
            <div className="mb-4 text-red-500 text-center">
              <p>{error}</p>
            </div>
          )}

          {/* Show loader if isLoading is true */}
          {isLoading ? (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Job ID Dropdown */}
              <div className="mb-6">
                <label
                  htmlFor="jobId"
                  className="block text-lg font-medium text-gray-700 mb-1"
                >
                  Select Job ID
                </label>
                <select
                  id="jobId"
                  value={selectedJobId}
                  onChange={(e) => setSelectedJobId(e.target.value)}
                  className="w-full px-4 py-2 text-black bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select a Job ID
                  </option>
                  {jobIds.map((jobId) => (
                    <option key={jobId} value={jobId}>
                      {jobId}
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Dropdown */}
              {selectedJobId && (
                <div className="mb-6">
                  <label
                    htmlFor="customer"
                    className="block text-lg font-medium text-gray-700 mb-1"
                  >
                    Select Customer
                  </label>
                  <select
                    id="customer"
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                    className="w-full px-4 py-2 text-black bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select a Customer
                    </option>
                    {customers.map((customer) => (
                      <option key={customer} value={customer}>
                        {customer}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Cartoon Dropdown */}
              {selectedCustomer && cartoons.length > 0 && (
                <div className="mb-6">
                  <label
                    htmlFor="cartoon"
                    className="block text-lg font-medium text-gray-700 mb-1"
                  >
                    Select Cartoon
                  </label>
                  <select
                    id="cartoon"
                    value={selectedCartoon}
                    onChange={(e) => setSelectedCartoon(e.target.value)}
                    className="w-full px-4 py-2 text-black bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select a Cartoon
                    </option>
                    {cartoons.map((cartoon) => (
                      <option
                        key={cartoon._id}
                        className="text-black"
                        value={cartoon.cartonno}
                      >
                        {cartoon.cartonno}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* If no cartoons are found */}
              {selectedCustomer && cartoons.length === 0 && (
                <div className="mb-6 text-red-500 text-center">
                  <p>No cartoons available for this customer.</p>
                </div>
              )}

              {/* Bill Input */}
              <div className="mb-6">
                <label
                  htmlFor="bill"
                  className="block text-lg font-medium text-gray-700 mb-1"
                >
                  Bill Amount
                </label>
                <input
                  type="number"
                  id="bill"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  className="w-full px-4 py-2 text-black bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Paid Input */}
              <div className="mb-6">
                <label
                  htmlFor="paid"
                  className="block text-lg font-medium text-gray-700 mb-1"
                >
                  Paid Amount
                </label>
                <input
                  type="number"
                  id="paid"
                  value={paid}
                  onChange={(e) => setPaid(e.target.value)}
                  className="w-full px-4 py-2 text-black bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DistributeToCustomer;

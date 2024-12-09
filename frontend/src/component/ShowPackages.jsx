import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../common/Loader";
import Menu from "../common/Menu";

const ShowPackages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [packageData, setPackageData] = useState([]);
  const [jobIds, setJobIds] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");

  const handleUpdate = (id) => {
    alert(`Update package with ID: ${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this package?"
    );
    if (confirmDelete) {
      setPackageData(packageData.filter((pkg) => pkg._id !== id));
    }
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(import.meta.env.VITE_API_URL + "api/shipping/jobIds")
      .then(({ data }) => {
        setJobIds(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job IDs:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedJobId) {
      setIsLoading(true);
      axios
        .get(import.meta.env.VITE_API_URL + "api/shipping/viewShipment", {
          params: { jobId: selectedJobId },
        })
        .then(({ data }) => {
          setPackageData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching packages:", error);
          setIsLoading(false);
        });
    }
  }, [selectedJobId]);

  return (
    <div className="grid grid-cols-6">
      {/* Menu is always visible */}
      <div>
        <Menu />
      </div>

      <div className="col-span-5">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-4 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 min-h-screen">
            <div className="col-span-5 flex justify-center">
              <div className="w-full max-w-7xl overflow-hidden bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
                  Show Packages
                </h2>

                <div className="mb-6">
                  <label
                    htmlFor="jobId"
                    className="block text-lg font-semibold text-black"
                  >
                    Select Job ID
                  </label>
                  <select
                    id="jobId"
                    name="jobId"
                    value={selectedJobId}
                    onChange={(e) => setSelectedJobId(e.target.value)}
                    className="w-full text-black mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base"
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

                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                  <thead>
                    <tr className="bg-gray-300 text-lg font-semibold text-blue-700">
                      <th className="px-4 py-2">SL</th>
                      <th className="px-4 py-2">Time</th>
                      <th className="px-4 py-2">Shipping Mark</th>
                      <th className="px-4 py-2">TCTN</th>
                      <th className="px-4 py-2">Description</th>
                      <th className="px-4 py-2">Carton No</th>
                      <th className="px-4 py-2">CTN</th>
                      <th className="px-4 py-2">GWCTN</th>
                      <th className="px-4 py-2">QTYCTN</th>
                      <th className="px-4 py-2">CBM</th>
                      <th className="px-4 py-2">Delivery Status</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packageData.map((pkg, index) => (
                      <tr
                        key={pkg._id}
                        className={`text-base font-medium ${
                          index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        } hover:bg-blue-100 transition-colors`}
                      >
                        <td className="px-4 py-2 border-b text-gray-800">
                          {pkg.sl}
                        </td>
                        <td className="px-4 py-2 border-b text-gray-800">
                          {pkg.time}
                        </td>
                        <td className="px-4 py-2 border-b text-gray-800">
                          {pkg.shippingmark}
                        </td>
                        <td className="px-4 py-2 border-b text-gray-800">
                          {pkg.tctn}
                        </td>
                        <td className="px-4 py-2 border-b text-gray-800">
                          {pkg.description}
                        </td>
                        <td className="px-4 py-2 border-b text-gray-800">
                          {pkg.cartonno}
                        </td>
                        <td className="px-4 py-2 border-b text-gray-800">
                          {pkg.ctn}
                        </td>
                        <td className="px-4 py-2 border-b text-gray-800">
                          {pkg.gwctn}
                        </td>
                        <td className="px-4 py-2 border-b text-gray-800">
                          {pkg.qtyctn}
                        </td>
                        <td className="px-4 py-2 border-b text-gray-800">
                          {pkg.cbm}
                        </td>
                        <td className="px-4 py-2 border-b text-gray-800">
                          {pkg.deliveryStatus ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </td>
                        <td className="px-4 py-2 border-b mb-2">
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded mr-2 mb-2 hover:bg-green-600 text-base"
                            onClick={() => handleUpdate(pkg._id)}
                          >
                            Update
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-base"
                            onClick={() => handleDelete(pkg._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowPackages;

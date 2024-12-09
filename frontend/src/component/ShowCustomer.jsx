import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../common/Loader";
import Menu from "../common/Menu";

const ShowCustomer = () => {
  // Sample customer data
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle update action
  const handleUpdate = (id) => {
    alert(`Update customer with ID: ${id}`);
    // Add update logic here
  };

  // Handle delete action
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (confirmDelete) {
      setCustomers(customers.filter((customer) => customer.id !== id));
    }
  };
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(import.meta.env.VITE_API_URL + "api/customer/show")
      .then(({ data }) => {
        setCustomers(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-4">
          <div className="">
            <Menu />
          </div>
          <div className="col-span-3">
            <div className="p-4">
              <h1 className="text-2xl font-bold mb-4">Customer List</h1>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-blue-600">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-white">
                        Name
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-white">
                        Contact Number
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-white">
                        Company Name
                      </th>
                      <th className="border border-gray-300 px-4 py-2 text-white">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer, index) => (
                      <tr
                        key={customer.id}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <td className="border border-gray-300 px-4 py-2 text-gray-800">
                          {customer.name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-800">
                          {customer.phoe}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-gray-800">
                          {customer.companyName}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                            onClick={() => handleUpdate(customer._id)}
                          >
                            Update
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            onClick={() => handleDelete(customer._id)}
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
        </div>
      )}
    </div>
  );
};

export default ShowCustomer;

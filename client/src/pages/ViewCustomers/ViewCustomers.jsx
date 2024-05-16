// ViewCustomers.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewCustomers.css";
import { CustomerCard } from "../../components/CustomerCard";
import Swal from "sweetalert2";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../api/auth";

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { API } = useAuth();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      // const response = await axios.get("http://localhost:5000/api/customers");

      const response = await axios.get(`${API}/api/customers`);

      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.adrNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.c_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const closePopup = () => {
    setSelectedCustomer(null);
  };

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ha, Kardo delete !",
      });

      if (result.isConfirmed) {
        // await axios.delete(
        //   `http://localhost:5000/api/deleteCustomer/${selectedCustomer.c_id}`
        // );

        await axios.delete(
          `${API}/api/deleteCustomer/${selectedCustomer.c_id}`
        );

        fetchCustomers();
        setSelectedCustomer(null);
        Swal.fire("Deleted!", "Your customer has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      Swal.fire(
        "Error!",
        "An error occurred while deleting the customer.",
        "error"
      );
    }
  };

  return (
    <div className="main-container">
      <div className="view-customers-container">
        <h1>All Customers</h1>
        <input
          type="text"
          placeholder="Search by Customer ID, Name, or Aadhaar number"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <p>Total Customers: {customers.length}</p>
        <div className="customer-cards-container">
          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer._id}
              customer={customer}
              onClick={handleCustomerClick}
            />
          ))}
        </div>
        {selectedCustomer && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={closePopup}>
                &times;
              </span>

              <div className="profile-heading">
                <h2>Customer ID: {selectedCustomer.c_id}</h2>
              </div>
              <div className="profile-details">
                <div className="profile-col-1">
                  <p>
                    <strong>Name:</strong> {selectedCustomer.name}
                  </p>
                  <p>
                    <strong> {selectedCustomer.relation}</strong>{" "}
                    {selectedCustomer.relationshipName}
                  </p>

                  <p>
                    <strong>Banks Linked:</strong>{" "}
                    {selectedCustomer.banksLinked}
                  </p>
                  <p>
                    <strong>Job Card No.:</strong> {selectedCustomer.jcNo}
                  </p>
                  <p>
                    <strong>Mobile No:</strong> {selectedCustomer.mobileNo}
                  </p>
                </div>
                <div className="profile-col-2">
                  <p>
                    <strong>Aadhaar No.:</strong> {selectedCustomer.adrNumber}
                  </p>
                  <p>
                    <strong>Gender:</strong> {selectedCustomer.gender}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {selectedCustomer.dob}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedCustomer.address}
                  </p>
                  <p>
                    <strong>Added By:</strong> {selectedCustomer.addedBy}
                  </p>
                  {/* <p>
                    <strong>Added At:</strong> {selectedCustomer.addedAt}
                  </p> */}
                </div>
              </div>

              <div className="ed-actions">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="edit-icon"
                  // onClick={() => handleEdit(customer._id)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="delete-icon"
                  onClick={handleDelete}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { ViewCustomers };

import React, { useState, useEffect } from "react";
import "./AddCustomer.css";
import { toast } from "react-toastify";
import { useAuth } from "../../api/auth";
import Swal from "sweetalert2";


const AddCustomer = () => {
  const { user, API } = useAuth(); // Access user info using useAuth hook

  const [formData, setFormData] = useState({
    adrNumber: "",
    c_id: "",
    name: "",
    gender: "",
    relation: "",
    relationshipName: "",
    banksLinked: "",
    mobileNo: "",
    dob: "",
    address: "",
    addedBy: user.name,
    jcNo: "",
    customerExists: false,
  });

  const handleRelationChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      relation: value,
    });
  };

  const getFullRelation = (abbreviation) => {
    switch (abbreviation) {
      case "C/O":
        return "Care Of";
      case "W/O":
        return "Wife Of";
      case "S/O":
        return "Son Of";
      case "D/O":
        return "Daughter Of";
      default:
        return "";
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (formData.c_id) {
        checkCustomerExists();
      }
    }, 300); // Debounce time in milliseconds

    return () => clearTimeout(delayDebounceFn);
  }, [formData.c_id]); // Re-run effect if Aadhaar number changes

  const checkCustomerExists = async () => {
    try {
      // const response = await fetch(
      //   `http://localhost:5000/api/checkCustomerExists/${formData.c_id}`
      // );

      const response = await fetch(
        `${API}/api/checkCustomerExists/${formData.c_id}`
      );
     

      const res_data = await response.json();

      if (response.ok) {
        setFormData((prevState) => ({
          ...prevState,
          customerExists: res_data.exists,
        }));
        if (res_data.exists) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Customer Already Exists!",
          });
        }
      } else {
        // toast.error(
        //   res_data.extraDetails ? res_data.extraDetails : res_data.message
        // );

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res_data.extraDetails
            ? res_data.extraDetails
            : res_data.message,
        });
      }
    } catch (error) {
      console.error("Error checking customer existence:", error);
    }
  };

  const handleAdrToIdChange = (e) => {
    const { value } = e.target;
    let c_id = value.slice(-4); // Extract last 4 digits of Aadhaar Number
    setFormData({ ...formData, adrNumber: value, c_id }); // Update Aadhaar Number and Customer ID
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);

    try {
      // Fetch the currently logged-in user ID or pass it as a prop
      if (!user) {
        toast.error("Pehle Login Karo");
        return;
      }

      // const response = await fetch(`http://localhost:5000/api/AddCustomer`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });

      const response = await fetch(`${API}/api/AddCustomer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res_data = await response.json();
      // console.log("Customer added successfully:", response)
      console.log("Response from server:", res_data.extraDetails);

      if (response.ok) {
        // Handle success
        // toast.success("ha add hogaya");

        Swal.fire({
          icon: "success",
          title: "Success",
          // text: 'Customer added successfully',
          text: "Ha Add Hogaya",
        });

        // Clear form data
        setFormData({
          adrNumber: "",
          c_id: "",
          name: "",
          gender: "",
          relation: "",
          relationshipName: "",
          banksLinked: "",
          mobileNo: "",
          dob: "",
          address: "",
          addedBy: user.name,
          jcNo: "",
          customerExists: false,
        });
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      // Handle error
      console.error("Error adding customer:", error);
    }
  };

  return (
    <div className="main-container">
      <div className="add-c-data">
        <div className="form-container">
          <h1>Add Customer Data:</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="inputbox">
                <input
                  type="text"
                  name="adrNumber"
                  value={formData.adrNumber}
                  onChange={handleAdrToIdChange}
                  maxLength={12}
                  required
                />
                <span>Aadhaar Number</span>
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  name="c_id"
                  value={formData.c_id}
                  onChange={handleChange}
                  required
                />
                <span>Customer ID</span>
              </div>
            </div>

            <div className="form-group">
              <div className="inputbox">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <span>Name</span>
              </div>
              <div className="inputbox">
                <select
                  name="relation"
                  value={formData.relation}
                  onChange={handleRelationChange}
                  required
                >
                  <option value=""></option>
                  <option value="C/O">C/O</option>
                  <option value="W/O">W/O</option>
                  <option value="S/O">S/O</option>
                  <option value="D/O">D/O</option>
                </select>
                <span>Relation</span>
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  name="relationshipName"
                  value={formData.relationshipName}
                  onChange={handleChange}
                  required
                />

                <span>
                  {formData.relation
                    ? getFullRelation(formData.relation)
                    : "Select Relation"}
                </span>
              </div>
            </div>

            <div className="form-group">
              <div className="inputbox">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <span>Gender</span>
              </div>
              <div className="inputbox">
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
                <span style={{ backgroundColor: "white", margin: "2px" }}>
                  Date of Birth
                </span>
              </div>
            </div>

            <div className="form-group">
              <div className="inputbox">
                <input
                  type="text"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  required
                />
                <span>Mobile No.</span>
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  name="banksLinked"
                  value={formData.banksLinked}
                  onChange={handleChange}
                  required
                />
                <span>Banks linked with</span>
              </div>
            </div>

            <div className="form-group">
              <div className="inputbox">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <span>Address</span>
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  name="jcNo"
                  value={formData.jcNo}
                  onChange={handleChange}
                  required
                />
                <span>Job Card No.</span>
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { AddCustomer };

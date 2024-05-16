import React, { useState } from "react";
import "../AddCustomer/AddCustomer.css"; // Reusing the existing CSS
import { toast } from "react-toastify";
import { useAuth } from "../../api/auth";


const AddTransaction = () => {
  const { user, API } = useAuth();

  const [formData, setFormData] = useState({
    customerId: "",
    datetime: "",
    amountWithdrawn: "",
    txnDoneBy: "",
    earnings: "",
    bank: "",
    remark: "",
    txnApp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!user) {
        toast.error("Pehle Login Karo");
        return;
      }

      // const response = await fetch("http://localhost:5000/api/AddTransaction", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });

      const response = await fetch(`${API}/api/AddTransaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    
      const resData = await response.json();

      if (response.ok) {
        toast.success("Transaction added successfully");
      } else {
        toast.error(
          resData.extraDetails ? resData.extraDetails : resData.message
        );
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="main-container">
      <div className="add-c-data">
        <div className="form-container">
          <h1>Add Transaction Data:</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="inputbox">
                <input
                  type="text"
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  required
                />
                <span>Customer ID</span>
              </div>
              <div className="inputbox">
                <input
                  type="datetime-local"
                  name="datetime"
                  value={formData.datetime}
                  onChange={handleChange}
                  required
                />
                <span style={{ backgroundColor: "white", margin: "2px", width:"80%" }}>Date and Time</span>
              </div>
            </div>

            <div className="form-group">
              <div className="inputbox">
                <input
                  type="number"
                  name="amountWithdrawn"
                  value={formData.amountWithdrawn}
                  onChange={handleChange}
                  required
                />
                <span>Amount Withdrawn</span>
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  name="txnDoneBy"
                  value={formData.txnDoneBy}
                  onChange={handleChange}
                  required
                />
                <span>Transaction Done By</span>
              </div>
            </div>

            <div className="form-group">
              <div className="inputbox">
                <input
                  type="number"
                  name="earnings"
                  value={formData.earnings}
                  onChange={handleChange}
                  required
                />
                <span>Earnings on that Transaction</span>
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  name="bank"
                  value={formData.bank}
                  onChange={handleChange}
                  required
                />
                <span>Bank</span>
              </div>
            </div>

            <div className="form-group">
              <div className="inputbox">
                <input
                  type="text"
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                  required
                />
                <span>Remark (if any)</span>
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  name="txnApp"
                  value={formData.txnApp}
                  onChange={handleChange}
                  required
                />
                <span>Transaction App</span>
              </div>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { AddTransaction };

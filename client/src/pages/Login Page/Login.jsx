import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../api/auth";
import { toast } from "react-toastify";


const Login = () => {
  const [formData, setFormData] = useState({
    c_id: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
 const { storeTokenInLS, API } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
      const response = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      

      // Handle response based on success or failure
      console.log("Login Form");

      if (response.ok) {
        const res_data = await response.json();

        // console.log("Response from Server", res_data);
        storeTokenInLS(res_data.token);

        toast.success("Ha Hogaya login");
        setFormData({ c_id: "", password: "" });
        navigate("/Home");
      } else {
        toast.error("Oye! Galat input deke kidhar jana bolre haan?");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
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

          <div className="inputbox">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span>Password</span>
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export { Login };

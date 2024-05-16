// Logout.jsx

import { Link } from "react-router-dom";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import "./Logout.css";
import { useAuth } from "../../api/auth";
import { useEffect } from "react";



const Logout = () => {

  const { LogoutUser } = useAuth();
  
  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);

 
  

  return (
    <div className="main-container" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="logout-box">
        <FaSignOutAlt className="login-icon" />

        <h2 style={{ margin: "20px 0", color: "#007bff" }}>
          You have been logged out
        </h2>
        <p style={{ margin: "20px 0", fontSize: "18px" }}>
          Let's proceed with our tasks!
        </p>

        <Link to="/" className="combined-btn">
          Login Again
          <div className="btn-icon">
            <FaSignInAlt /> 
          </div>
        </Link>
        <div className="lgt-footer">
          <p style={{ margin: "10px 0"}}>
            Need help? <a href="#">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export { Logout };
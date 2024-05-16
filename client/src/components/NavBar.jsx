import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../api/auth";
import { FaUser, FaSignOutAlt, FaHome } from "react-icons/fa";
import Avatar from "../components/Avatar";
import "./NavBar.css";

import { toast } from "react-toastify";

const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
 

  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('');

  // Extract the page name from the pathname
  const getPageName = () => {
    const path = location.pathname;
    const pageName = path.substring(1); 
    return pageName;
  };

  // Update the currentPage state when the location changes
  useEffect(() => {
    setCurrentPage(getPageName());
  }, [location]);


  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    navigate("/logout");
    
  toast.success("Logout Successful");
  };

  return (
    <nav className="navbar">
      

      <ul className="navbar-nav">
        <div className="home-btn">
        <Link to="/Home" className="home-btn">
          <FaHome />
        </Link>
        <p>{currentPage}</p>
      </div>
        <li className="nav-item">
          <Link to="/Home" className="nav-link">
            <FaHome  style={{ verticalAlign: "middle", fontSize:"30px" }}  />
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/AddCustomer" className="nav-link">
            Add New Customer
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Customers" className="nav-link">
           View All Customers
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/AddTransaction" className="nav-link">
            Add a Transaction
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Transactions" className="nav-link">
            View Transactions
          </Link>
        </li>
      </ul>

      <div className="avatar-container" onClick={handleAvatarClick}>
        <Avatar
        width="10px"
          backgroundColor="orange"
          px="10px"
          py="7px"
          borderRadius="50%"
          color="white"
        >
          {user.name ? user.name.charAt(0).toUpperCase() : ""}
        </Avatar>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button
              onClick={() => navigate(`/Profile/${user.c_id ? user.c_id : ""}`)}
            >
              {" "}
              <FaUser style={{ verticalAlign: "top" }} /> View Profile
            </button>
            <div
              style={{ borderBottom: "1px solid white", margin: "10px 0" }}
            ></div>
            <button onClick={handleLogout}>
              Logout <FaSignOutAlt style={{ verticalAlign: "middle" }} />{" "}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export { NavBar };

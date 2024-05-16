import React from "react";
import { Link } from "react-router-dom"; 
import "./Home.css"; 
import { useAuth } from "../../api/auth";

const Home = () => {
  const { user } = useAuth();
  return (
    <div className="main-container">
      <div className="home-container">
        <h1>Welcome <b>{user.name}</b></h1>
        <div className="button-grid">
          <Link to="/AddCustomer" className="home-button">
            Add New Customer
          </Link>
          <Link to="/Customers" className="home-button">
            View All Customers
          </Link>
          <Link to="/AddTransaction" className="home-button">
            Add a Transaction
          </Link>
          <Link to="/Transactions" className="home-button">
            View Transactions
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Home };

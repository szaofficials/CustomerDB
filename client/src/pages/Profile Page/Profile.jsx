import React from "react";
import { useAuth } from "../../api/auth";
import "./profile.css";
import Avatar from "../../components/Avatar";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="main-container">
      <div className="profile-container">
        <div className="avatar">
          <Avatar
            backgroundColor="orange"
            px="10px"
            py="7px"
            borderRadius="50%"
            color="white"
          >
            {user.name ? user.name.charAt(0).toUpperCase() : ""}
          </Avatar>
        </div>

        <div className="profile-heading">
          <h2 >{user.fullName}</h2>
          <p ><b>Role: {user.role}</b></p>
        </div>
        <div className="profile-details">
          <div className="profile-col-1">
            <p>
              <strong>User ID:</strong> {user.c_id}
            </p>
           
            <p>
              <strong>Aadhaar No. :</strong> {user.adrNumber}
            </p>
            
            <p>
              <strong>Relation:</strong> {user.relation} {user.relationshipName}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
          </div>
          <div className="profile-col-2">
         
            <p>
              <strong>DOB:</strong>{" "}
              {/* {new Date(user.dob.$date).toLocaleDateString()} */}
              {user.dob}
            </p>
            <p>
              <strong>Mobile No:</strong> {user.mobileNo}
            </p>
            <p>
              <strong>Bank Linked:</strong> {user.banksLinked}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

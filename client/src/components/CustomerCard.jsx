// CustomerCard.jsx

import React from "react";

const CustomerCard = ({ customer, onClick }) => {
  return (
    <div className="customer-card" onClick={() => onClick(customer)}>
      <h3>{customer.name}</h3>
      <p>
        <strong>{customer.relation}</strong> {customer.relationshipName}
      </p>
      <p>
        <strong>Customer ID:</strong> {customer.c_id}
      </p>
      <p>
        <strong>Banks:</strong> {customer.banksLinked}
      </p>
    </div>
  );
};

export { CustomerCard };

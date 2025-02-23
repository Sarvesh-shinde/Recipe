import React from "react";
import "./Filters.css";

const Filters = () => {
  return (
    <div className="filters">
      <select>
        <option>Category</option>
      </select>
      <select>
        <option>Type</option>
      </select>
      <input type="text" placeholder="Search..." />
    </div>
  );
};

export default Filters;

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "./farmerdashboard.css";

export default function Customerdashboard() {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {/* Sidebar */}

      <div className={`sidebar ${showSidebar ? "show-sidebar" : ""}`}>
        <div className="sidebar-header">
          <h1> Explore Menu </h1>
          {/*<h2>Grow with Agro Connect</h2>*/}
          <FontAwesomeIcon
            icon={faTimes}
            className="fa-times"
            onClick={handleToggleSidebar}
          />
        </div>
        <ul className="menu">
          <li>
            <NavLink to="/customerdashboard/productHome">Home</NavLink>
          </li>
          <li>
            <NavLink to="/customerdashboard/orderdetails">
              Order Details
            </NavLink>
          </li>
          <li>
            <NavLink to="/customerdashboard/customercontact">
              Contact details
            </NavLink>
          </li>
          <li>
            <NavLink to="/customerdashboard/yourorders">your Orders</NavLink>
          </li>
          <li>
            <NavLink to="/customerdashboard/shoppingcart">
              shopping cart
            </NavLink>
          </li>
          <li>
            <NavLink to="/customerdashboard/reviews">Reviews</NavLink>
          </li>
        </ul>
      </div>

      {/* Toggle button */}
      <FontAwesomeIcon
        icon={faBars}
        className="fa-bars"
        onClick={handleToggleSidebar}
      />
    </>
  );
}

import React, { useState } from "react";
import Customerdashboard from "../components/customerdashboard.js";
import Navbar from "../pages/Navbar.js";
//import axios from "axios";
import "../stylesheets/customercontact.css";

export default function Customercontactdetails() {
  const [formData, setFormData] = useState({
    email: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., sending data to backend)
    console.log(formData);
    // Reset form data after submission if needed
    setFormData({
      email: "",
      streetAddress1: "",
      streetAddress2: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      phone: "",
    });
  };

  return (
    <>
      <Navbar />
      <Customerdashboard />
      <div className="customercontactcontainer">
        <h1>Your Contact Details</h1>
        <form className="cform">
          <label>Street Address 1:</label>
          <input
            type="text"
            id="add1"
            name="street1"
            value={formData.streetAddress1}
            onChange={handleChange}
            required
          />
          <br />
          <label>Street Address 2:</label>
          <input
            type="text"
            id="add2"
            name="street2"
            value={formData.streetAddress2}
            onChange={handleChange}
          />
          <br />
          <label>City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <br />
          <label>State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <br />
          <label>Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
          <br />
          <label>Zipcode:</label>
          <input
            type="number"
            id="zipcode"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            className="no-arrow-input"
            required
          />
          <br />
          <label>Phone:</label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            inputMode="numeric"
            className="no-arrow-input"
            required
          />
          <br />
          <button onClick={handleSubmit} type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

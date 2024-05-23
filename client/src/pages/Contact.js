import React, { useState, useEffect } from "react";
//import Customerdashboard from "../components/customerdashboard.js";
import Navbar from "../pages/Navbar.js";
import "../stylesheets/customercontact.css";
import axios from "axios";
import Farmerdashboard from "../components/farmerdashboard.js";

export default function Customercontactdetails() {
  const [contactdet, setContactdet] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const user_id = localStorage.getItem("userEmail");
    if (user_id) {
      setFormData((prevData) => ({
        ...prevData,
        user_id: user_id, // Assuming email serves as farmer_id
      }));
    }
  }, []);

  const fetchData = async () => {
    try {
      const user_id = localStorage.getItem("userEmail");
      const response = await axios.get(
        `http://localhost:4000/customerdashboard/customercontact?user_id=${user_id}`
      );
      console.log(response);
      localStorage.setItem("addressid", response.data[1].address_id);
      setContactdet(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const [formData, setFormData] = useState({
    user_id: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:4000/customerdashboard/customercontact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = response.json();
        console.log(data);
        alert("You have successfully updated contact details ");
      } else {
        alert("Oops!  Please double-check your information and try again.");
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // Add logic to handle form submission (e.g., sending data to backend)
    console.log(formData);
    // Reset form data after submission if needed
  };

  return (
    <>
      <Navbar />
      <Farmerdashboard />
      <div className="customercontactcontainer">
        <h1>Your Contact Details</h1>
        <form className="cform">
          <label className="a">Street Address 1:</label>
          <input
            type="text"
            id="add1"
            name="street1"
            value={formData.street1}
            onChange={handleChange}
            required
          />
          <br />
          <label className="a">Street Address 2:</label>
          <input
            type="text"
            id="add2"
            name="street2"
            value={formData.street2}
            onChange={handleChange}
          />
          <br />
          <label className="a">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <br />
          <label className="a">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <br />
          <label className="a">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
          <br />
          <label className="a">Zipcode:</label>
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
          <label className="a">Phone:</label>
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
      <div className="contactslist">
        <h4> Your Previous Contact Details :</h4>
        <table>
          <thead>
            <tr>
              <th>user_id</th>
              <th>address_id</th>
              <th>street1</th>
              <th>street2</th>
              <th>city</th>
              <th>state</th>
              <th>country</th>
              <th>Zipcode</th>
              <th>phone</th>
            </tr>
          </thead>
          <tbody>
            {contactdet.map((contactd) => (
              <tr key={contactd.id}>
                <td>{contactd.user_id}</td>
                <td>{contactd.address_id}</td>
                <td>{contactd.street1}</td>
                <td>{contactd.street2}</td>
                <td>{contactd.city}</td>
                <td>{contactd.state}</td>
                <td>{contactd.country}</td>
                <td>{contactd.zipcode}</td>
                <td>{contactd.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

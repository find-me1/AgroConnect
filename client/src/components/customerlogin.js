import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/signup.css";
import Videobg from "../assets/agro9.mp4";

function Customerlogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        //const data = await response.json();
        //localStorage.setItem("token", data.token); // Store token in localStorage
        localStorage.setItem("userEmail", formData.email);
        navigate("/customerdashboard/productHome");
        // Redirect or perform other actions on successful login
      } else {
        throw new Error("Failed to login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="mainn">
        <div className="overlay"></div>
        <video src={Videobg} autoPlay loop muted />
      </div>
      <form className="content">
        <h1>Login</h1>
        <p className="pp">to AgroConnect for Customers</p>
        <label htmlFor="emaillogin">Your Email :</label>
        <br />
        <input
          type="email"
          id="emaillogin"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder=" Enter email address"
        />
        <br />
        <label htmlFor="passwordcustomer">Your Password :</label>
        <br />
        <input
          type="password"
          id="passwordcustomer"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder=" Password"
        />
        <br />
        <input type="submit" onClick={handleSubmit} value="Login ➡️" />
        <p className="pp">Need help? [Contact Us Link]</p>
      </form>
    </>
  );
}

export default Customerlogin;

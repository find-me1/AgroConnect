import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/signup.css";
import Videobg from "../assets/agro6.mp4";

function Farmerlogin() {
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
        localStorage.setItem("userEmail", formData.email);
        //localStorage.setItem("token", data.token); // Store token in localStorage
        navigate("/farmerdashboard/home");
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
        <p className="pp">to AgroConnect for Farmers</p>
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
        <label htmlFor="passwordfarmer">Your Password :</label>
        <br />
        <input
          type="password"
          id="passwordfarmer"
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

export default Farmerlogin;

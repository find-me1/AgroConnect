import React, { useState, useEffect } from "react";
import Farmerdashboard from "../components/farmerdashboard";
import Navbar from "./Navbar";
import "../stylesheets/product.css";
import axios from "axios";

export default function Products() {
  //const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
    price: "",
    description: "",
    available_units: "",
    farmer_id: "",
    carrier_phone: "",
  });

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setFormData((prevData) => ({
        ...prevData,
        farmer_id: userEmail, // Assuming email serves as farmer_id
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let categoryId;

    // Determine category ID based on user selection
    switch (value) {
      case "Vegetables":
        categoryId = 1;
        break;
      case "fruits":
        categoryId = 2;
        break;
      case "Diary_products":
        categoryId = 3;
        break;
      default:
        categoryId = ""; // Set default value if needed
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      category_id: categoryId, // Set category ID in formData
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/farmerdashboard/products",
        formData
      );
      console.log("Product added successfully:", response.data);
      // Optionally, you can redirect to a different page or show a success message
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  return (
    <>
      <Navbar />
      <Farmerdashboard />
      <div className="productcontainer">
        <h1>Add New Product</h1>
        <form className="pform">
          <label htmlFor="categoryId">Select Category:</label>
          <input
            list="category_id"
            id="list"
            name="category_id"
            onChange={handleChange}
            value={formData.category_id}
          />
          <datalist id="category_id">
            <option value="Vegetables">Vegetables</option>
            <option value="fruits"></option>
            <option value="Diary_products"></option>
          </datalist>
          <br />
          <label htmlFor="productname">Name of the product </label>
          <input
            type="name"
            id="productname"
            name="name"
            placeholder="Enter Product name"
            value={formData.name}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="productprice">Product Price </label>
          <input
            type="number"
            id="productprice"
            name="price"
            placeholder="Enter Product price"
            value={formData.price}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="description" id="desc">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write your description here..."
            rows="4"
            cols="50"
          ></textarea>
          <br />
          <label htmlFor="availableunits">Availble Units </label>
          <input
            type="number"
            id="availableunits"
            name="available_units"
            placeholder="Enter Product price"
            value={formData.available_units}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="carrierphone">carrier phone</label>
          <input
            type="number"
            id="carrierphone"
            name="carrier_phone"
            placeholder="Enter Product price"
            value={formData.carrier_phone}
            onChange={handleChange}
          />
          <input type="hidden" name="farmer_id" value={formData.farmer_id} />
          <br />
          <button onClick={handleSubmit} type="submit">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
}

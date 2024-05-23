import React, { useState, useEffect } from "react";
import Navbar from "../pages/Navbar.js";
import "../stylesheets/productHome.css";
import Customerdashboard from "../components/customerdashboard.js";
import axios from "axios";

export default function Producthome() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const customer_id = localStorage.getItem("userEmail");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/customerdashboard/productHome"
      );
      console.log(response);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleCheckboxChange = (event) => {
    const productId = parseInt(event.target.value);
    if (event.target.checked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/customerdashboard/productHome",
        { customer_id, product_ids: selectedProducts } // Send all selected product IDs
      );
      console.log(response);
      // Handle success message or update UI accordingly
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  const handlePlaceOrder = async () => {
    const customer_id = localStorage.getItem("userEmail");

    try {
      const response = await axios.post(
        "http://localhost:4000/customerdashboard/placeorder",
        customer_id // Wrap orders in an array
      );
      console.log(response);
      // Handle success message or update UI accordingly
    } catch (error) {
      console.error("Error placing order:", error);
    }
  }; /*
  const handlePlaceOrder = async () => {
    const deliveryAddressId = localStorage.getItem("addressid");
    const customer_id = localStorage.getItem("userEmail");

    try {
      const orders = selectedProducts.map((productId) => ({
        customer_id: customer_id,
        price: parseInt(
          products.find((product) => product.product_id === productId).price
        ),
        delivery_address_id: parseInt(deliveryAddressId),
      }));

      const response = await axios.post(
        "http://localhost:4000/customerdashboard/placeorder",
        [orders] // Wrap orders in an array
      );
      console.log(response);
      // Handle success message or update UI accordingly
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };*/

  return (
    <>
      <Navbar />
      <Customerdashboard />
      <div className="pcontainer">
        <h1>Welcome to Agro Connect Customer Home</h1>
        <div className="custprofile">
          {/* profile symbol for cdnjs */}
          <h2>Your Name : Customer Name</h2>
          <h3> Your Email : Customer Email</h3>
        </div>
        <div className="productslist">
          <h4>Product List :</h4>
          <table>
            <thead>
              <tr>
                <th>product_id</th>
                <th>Name</th>
                <th>Farmer ID</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Review Count</th>
                <th>Category ID</th>
                <th>Description</th>
                <th>Available Units</th>
                <th>In Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.product_id}</td>
                  <td>{product.name}</td>
                  <td>{product.farmer_id}</td>
                  <td>{product.price}</td>
                  <td>{product.rating}</td>
                  <td>{product.review_count}</td>
                  <td>{product.category_id}</td>
                  <td>{product.description}</td>
                  <td>{product.available_units}</td>
                  <td>{product.in_stock}</td>

                  <td>
                    <input
                      type="checkbox"
                      id={`product_${product.id}`}
                      name={`product_${product.id}`}
                      value={product.product_id}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={`product_${product.id}`}></label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="actions">
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      </div>
    </>
  );
}

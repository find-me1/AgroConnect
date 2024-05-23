import React from "react";
import ReactDOM from "react-dom/client";
//import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import "./index.css";
import reportWebVitals from "./reportWebVitals";
import FarmerLogin from "./components/farmerlogin.js";
import CustomerLogin from "./components/customerlogin.js";
import Main from "./components/main.js";
import CustomerSignup from "./components/customersignup.js";
import FarmerSignup from "./components/farmersignup.js";
import Farmerdashboard from "./components/farmerdashboard.js";
import Customerdashboard from "./components/customerdashboard.js";
import Home from "./pages/Home.js";
import Producthome from "./customerpages/productHome.js";
import Products from "./pages/product.js";
import Contact from "./pages/Contact.js";
//import Rented from "./pages/Rented.js";
//import Reviews from "./pages/Reviews.js";
import Machinery from "./pages/Machinery.js";
import AvailableMachinery from "./pages/AvailableMachinery.js";
import Customercontact from "./customerpages/contactdetails.js";
import Customerorderdetails from "./customerpages/contactdetails.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/farmerLogin" element={<FarmerLogin />} />
        <Route path="/customerLogin" element={<CustomerLogin />} />
        <Route path="/farmerSignup" element={<FarmerSignup />} />
        <Route path="/customerSignup" element={<CustomerSignup />} />
        <Route path="/farmerdashboard/*" element={<Farmerdashboard />} />
        <Route path="/farmerdashboard/home" element={<Home />} />
        <Route path="/farmerdashboard/products" element={<Products />} />
        <Route path="/customerdashboard/*" element={<Customerdashboard />} />
        <Route path="/farmerdashboard/Contact" element={<Contact />} />
        <Route path="/farmerdashboard/machinery" element={<Machinery />} />
        <Route
          path="/farmerdashboard/available-machinery"
          element={<AvailableMachinery />}
        />
        <Route
          path="/customerdashboard/Producthome"
          element={<Producthome />}
        />
        <Route
          path="/customerdashboard/orderdetails"
          element={<Customerorderdetails />}
        />
        <Route
          path="/customerdashboard/customercontact"
          element={<Customercontact />}
        />
        <Route path="/customerdashboard/yourorders" element={<Machinery />} />
        <Route path="/customerdashboard/shoppingcart" element={<Machinery />} />
        <Route path="/customerdashboard/reviews" element={<Machinery />} />
      </Routes>
    </>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

import React from "react";
import "./navbar.css";
export default function Navbar() {
  return (
    <div className={"navbar1 active"}>
      {/*<img src="./logo.svg" alt="logo">*/}

      <ul className="a1">
        <li>
          <a href="dd">Home</a>
        </li>
        <li>
          <a href="pp">About Us</a>
        </li>
        <li>
          <a href="ew">Help</a>
        </li>
        <li>
          <a href="sa">News</a>
        </li>
      </ul>
    </div>
  );
}

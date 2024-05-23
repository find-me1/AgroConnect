import React from "react";
import Farmerdashboard from "../components/farmerdashboard";
import Navbar from "./Navbar";
import "../stylesheets/home.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <Farmerdashboard />
      <div className="homecontainer">
        <h1>Welcome to Home</h1>
        <p>Farmer ID (Email): farmerId</p>
        <div className="averagerating">
          <p>Average Rating: </p>
          <br />
          <div class="box box2">
            <div class="text">
              <h2 class="topic-heading">150</h2>
              <h2 class="topic">Likes</h2>
            </div>
          </div>
        </div>
        <form>
          <label htmlFor="description" id="desc">
            Description:
          </label>
          <br />
          <textarea
            id="description"
            name="description"
            //value={description}
            // onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your description here..."
            rows="4"
            cols="50"
          ></textarea>
          <br />
          <button type="submit">Update Description</button>
        </form>
        <div className="ratingcount">
          <p>Rating Count: </p>
          <br />
          <div class="box box2">
            <div class="text">
              <h2 class="topic-heading">150</h2>
              <h2 class="topic">Likes</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

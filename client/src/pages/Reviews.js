import React from "react";
import Farmerdashboard from "../components/farmerdashboard";

export default function Reviews() {
  return (
    <>
      <Farmerdashboard />
      <div>
        <h1>Welcome to Home</h1>
        <p>This is the Home page content.</p>
        <div>
          <h1>Home Dashboard</h1>
          <p>Farmer ID (Email): farmerId</p>
          <p>Average Rating: averageRating</p>
          <p>Rating Count: </p>
          <form>
            <label htmlFor="description">Description:</label>
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
        </div>
      </div>
    </>
  );
}

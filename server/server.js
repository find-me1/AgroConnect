/*const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const port = 4000;

// PostgreSQL connection pool
const pool = new Pool({
  user: "postgres",
  password: "anvesh",
  host: "localhost",
  port: 5432,
  database: "backend",
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle POST request
app.post("/signup", async (req, res) => {
  const { email, fname, lname, password } = req.body;

  try {
    const functionStmt = `CALL register_farmer($1, $2, $3, $4)`;
    const values = [email, fname, lname, password];

    const result = await pool.query(functionStmt, values);
    console.log("Stored procedure executed successfully");
    res.status(200).send("Stored procedure executed successfully");
  } catch (error) {
    console.error("Error executing stored procedure:", error);
    res.status(500).send("Error executing stored procedure");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); /* });
*/
const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());
/////////////////////////////////////////////////////
app.post("/farmersignup", (req, res) => {
  const email = req.body["email"];
  const fname = req.body["fname"];
  const lname = req.body["lname"];
  const password = req.body["password"];

  console.log("email:" + email);
  console.log("firstname:" + fname);
  console.log("lastname:" + lname);
  console.log("password:" + password);
  // const insertStmt = `insert into f2c_user(email,fname,lname,password,user_type) values('${email}','${fname}','${lname}','${password}','${user_type}')`;
  const functionstmt = `call register_farmer('${email}','${fname}','${lname}','${password}')`;
  pool
    .query(functionstmt)
    .then((response) => {
      console.log("Data Saved");
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(req.body);
  res.send("Response Received: " + req.body);
});

app.post("/customersignup", (req, res) => {
  const email = req.body["email"];
  const fname = req.body["fname"];
  const lname = req.body["lname"];
  const password = req.body["password"];

  console.log("email:" + email);
  console.log("firstname:" + fname);
  console.log("lastname:" + lname);
  console.log("password:" + password);
  // const insertStmt = `insert into f2c_user(email,fname,lname,password,user_type) values('${email}','${fname}','${lname}','${password}','${user_type}')`;
  const functionstmt = `call register_customer('${email}','${fname}','${lname}','${password}')`;
  pool
    .query(functionstmt)
    .then((response) => {
      console.log("Data Saved");
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(req.body);
  res.send("Response Received: " + req.body);
});

//////////////////////////////////////////////////////////////////////

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("email:", email);
    console.log("password:", password);

    const user = await pool.query(
      "SELECT email, password FROM f2c_user WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (password !== user.rows[0].password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("User authenticated successfully");

    // Optionally, generate a JWT token for the authenticated user
    // const token = generateToken(user.rows[0].id);

    res.status(200).json({ message: "Login successful" /*, token: token */ });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});
////////////////////////////////////////////////////////

app.post("/farmerdashboard/products", (req, res) => {
  const name = req.body["name"];
  const farmer_id = req.body["farmer_id"];
  const price = req.body["price"];
  const category_id = req.body["category_id"];
  const description = req.body["description"];
  const available_units = req.body["available_units"];
  const carrier_phone = req.body["carrier_phone"];

  console.log("name:" + name);
  console.log("farmer_id:" + farmer_id);
  console.log("price:" + price);
  console.log("category_id:" + category_id);
  console.log("description:" + description);
  console.log("available_units:" + available_units);
  console.log("carrier_phone:" + carrier_phone);

  const functionstmt = `call add_product('${name}','${farmer_id}','${price}','${category_id}','${description}','${available_units}','${carrier_phone}')`;
  pool
    .query(functionstmt)
    .then((response) => {
      console.log("Data Saved");
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(req.body);
  res.send("Response Received: " + req.body);
});

/////////////////////////////////////////////////////////////////////

app.get("/customerdashboard/productHome", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM product");
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Error fetching products" });
  }
});

/////////////////////////////////////////////////////////////////////////

app.post("/customerdashboard/productHome", async (req, res) => {
  const { customer_id, product_ids } = req.body;
  try {
    // Check if product_id is an array
    if (!Array.isArray(product_ids)) {
      throw new Error("Product ID must be an array");
    }

    // Insert into product_shoppingcart table for each product ID
    for (const id of product_ids) {
      await pool.query("CALL add_to_shopping_cart($1, $2)", [customer_id, id]);
    }
    res.status(201).send("Added to cart successfully");
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).send("Error adding to cart");
  }
});

//////////////////////////////////////////////////////////////////////////

app.post("/customerdashboard/placeorder", (req, res) => {
  const customer_id = req.body["customer_id"];

  console.log("customer_id:" + customer_id);

  const functionstmt = `call place_order('${customer_id}')`;
  pool
    .query(functionstmt)
    .then((response) => {
      console.log("Data Saved");
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(req.body);
  res.send("Response Received: " + req.body);
});
/*
app.post("/customerdashboard/placeorder", async (req, res) => {
  const orders = req.body;

  try {
    for (const order of orders) {
      const { customer_id, price, delivery_address_id } = order;

      // Insert the order into the orders table directly without explicit transaction management
      await pool.query(
        "INSERT INTO f2c_order (customer_id, total_price, delivery_address_id, shipping_price, order_status, quantity) VALUES ($1, $2, $3, $4, $5, $6)",
        [customer_id, price, delivery_address_id, 10, "p", 10]
      );

      // Your additional logic for each order (e.g., sending confirmation email, updating inventory, etc.)
      console.log("Processing order:", order);
    }

    res.status(200).json({ message: "Orders processed successfully" });
  } catch (error) {
    console.error("Error processing orders:", error);
    res.status(500).json({ error: "Error processing orders" });
  }
});*/

/////////////////////////////////////////////////////////////////////////

app.post("/customerdashboard/customercontact", (req, res) => {
  const user_id = req.body["user_id"];
  const street1 = req.body["street1"];
  const street2 = req.body["street2"];
  const city = req.body["city"];
  const state = req.body["state"];
  const country = req.body["country"];
  const zipcode = req.body["zipcode"];
  const phone = req.body["phone"];

  console.log("user_id:" + user_id);
  console.log("street1:" + street1);
  console.log("street2:" + street2);
  console.log("city:" + city);
  console.log("state:" + state);
  console.log("country:" + country);
  console.log("zipcode:" + zipcode);
  console.log("phone:" + phone);

  const functionstmt = `call add_contact_details('${user_id}','${street1}','${street2}','${city}','${state}','${country}','${zipcode}','${phone}')`;
  pool
    .query(functionstmt)
    .then((response) => {
      console.log("Data Saved");
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(req.body);
  res.send("Response Received: " + req.body);
});

//////////////////////////////////////////////////////////////////////////
app.get("/customerdashboard/customercontact", async (req, res) => {
  try {
    const { user_id } = req.query; // Extract user_id from query parameters
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM contact_detail WHERE user_id = $1",
      [user_id]
    );
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching contact details:", err);
    res.status(500).json({ error: "Error fetching contact details" });
  }
});

///////////////////////////////////////////
app.listen(4000, () => console.log("server on localhost:4000"));

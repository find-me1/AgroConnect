const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "anvesh",
  host: "localhost",
  port: 5432,
  database: "backend",
});
/*
pool
  .query(`select * from farmer`)
  .then((Response) => {
    console.log("Database Created");
    console.log(Response);
  })
  .catch((error) => {
    console.log(err);
  });
*/
module.exports = pool;

/*
<button onClick={handlePlaceOrder}>Place Order</button>
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
      product_id: productId,
    }));

    const response = await axios.post(
      "http://localhost:4000/customerdashboard/productHome",
      orders
    );
    console.log(response);
    // Handle success message or update UI accordingly
  } catch (error) {
    console.error("Error placing order:", error);
  }
};*/

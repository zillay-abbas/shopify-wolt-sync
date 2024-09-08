const axios = require("axios");
const { shopify, session } = require("../config/shopifyConfig");

// Fetch all products from Shopify
async function fetchAllProducts() {
  try {
    const client = new shopify.clients.Rest({ session: session });

    /* GET Orders from Shopify */
    const response = await client.get({
      path: "products",
    });

    console.log(
      JSON.stringify(response.body, null, 2)
    );
   
    return response.body.products;
  } catch (error) {
    console.error("Error fetching Shopify products:", error);
    throw error;
  }
}

module.exports = { fetchAllProducts };

const {
  mapShopifyProductsToWoltMenuItems,
  prepareWoltPostRequest,
} = require("../util");
const { fetchAllProducts } = require("./shopifyService");
const { postProductToWolt } = require("./woltService");

// Function to perform initial synchronization of products
async function initialSync() {
  try {
    // Fetch all products from Shopify
    const products = await fetchAllProducts();

    const woltMenuItems = mapShopifyProductsToWoltMenuItems(products);

    const woltPostRequest = prepareWoltPostRequest(woltMenuItems);

    const woltResp = await postProductToWolt(woltPostRequest);

    if (woltResp.status === 202) {
      console.log("Product posted successfully");
    } else {
      console.log("Wolt posting failed");
    }

    console.log("Initial synchronization completed successfully.");
  } catch (error) {
    console.error("Error during initial synchronization:", error);
  }
}

module.exports = { initialSync };

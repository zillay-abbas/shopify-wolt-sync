const axios = require('axios');

// Post product to WOLT
async function postProductToWolt(woltProductData) {
  try {
    const response = await axios.post(`https://pos-integration-service.wolt.com/v1/restaurants/${venueId}/menu`, woltProductData, {
      headers: {
        'Authorization': `Basic  ${process.env.WOLT_API_KEY}`,
        'Content-Type': `application/json`,
      },
    });

    console.log('Product posted to WOLT:', JSON.stringify(response.data));

    return response;
  } catch (error) {
    console.error('Error posting product to WOLT:', error);
    throw error;
  }
}

// Update product in WOLT
async function updateWoltProduct(product) {
  try {
    const woltProductData = {
      // Map updated Shopify product data to WOLT product data fields
    };

    const response = await axios.put(`WOLT_API_ENDPOINT/products/${product.id}`, woltProductData, {
      headers: {
        'Authorization': `Bearer ${process.env.WOLT_API_KEY}`,
      },
    });
    console.log('Product updated in WOLT:', response.data);
  } catch (error) {
    console.error('Error updating product in WOLT:', error);
    throw error;
  }
}

module.exports = { postProductToWolt, updateWoltProduct };

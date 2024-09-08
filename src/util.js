// Shopify to Wolt Mapper Function
function mapShopifyToWoltMenuItem(shopifyProduct) {
  const variant = shopifyProduct.variants[0]; // Assuming we're using the first variant

  return {
    name: [
      {
        lang: "en",
        value: shopifyProduct.title,
      },
    ],
    description: [
      {
        lang: "en",
        value: shopifyProduct.body_html.replace(/<[^>]*>/g, ""), // Remove HTML tags
      },
    ],
    image_url: shopifyProduct.image ? shopifyProduct.image.src : "",
    price: parseFloat(variant.price),
    vat_percentage: 0, // You may need to calculate this based on your specific requirements
    enabled: shopifyProduct.status === "active",
    delivery_methods: ["homedelivery"], // Adjust as needed
    quantity: variant.inventory_quantity,
    gtin_barcode: variant.barcode,
    merchant_sku: variant.sku,
  };
}

// Function to map multiple Shopify products to Wolt menu items
function mapShopifyProductsToWoltMenuItems(shopifyProducts) {
  return shopifyProducts.map(mapShopifyToWoltMenuItem);
}

// Function to prepare wolt request by setting items in wolt json
function prepareWoltPostRequest(woltMenuItems) {
  return {
    id: "string",
    currency: "string",
    primary_language: "string",
    categories: [
        {
          id: "string",
          name: [
            {
              lang: "string",
              value: "string"
            }
          ],
          description: [
            {
              lang: "string",
              value: "string"
            }
          ],
          subcategories: [],
          items: woltMenuItems,
          weekly_availability: []
        }
    ]
  };
}

module.exports = { mapShopifyProductsToWoltMenuItems, prepareWoltPostRequest };

require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const app = express();
const getRawBody = require("raw-body");
const crypto = require('crypto');

const { initialSync } = require("./services/commonService");

const secretKey = process.env.SHOPIFY_WEBHOOK_SECRET_KEY;
const port = process.env.PORT || 3000;

app.post("/webhooks/product/create", async (req, res) => {
  console.log("🎉 We got an order!");
  const hmac = req.get("X-Shopify-Hmac-Sha256");

  // Use raw-body to get the body (buffer)
  const body = await getRawBody(req);

  // Create a hash using the body and our key
  const hash = crypto
    .createHmac("sha256", secretKey)
    .update(body, "utf8", "hex")
    .digest("base64");

  if (hash !== hmac) {
    console.log("Not form shopify");
    res.sendStatus(401);
  }


  console.log(body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running and listening on port ${port}`);
  initialSync();
});

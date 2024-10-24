const { Spot } = require("@binance/connector");

require("dotenv").config({ path: "../.env" });
const client = new Spot(
  process.env.binanceAPIKey,
  process.env.binanceSecretKey,
  {
    // baseURL: "https://testnet.binance.vision",
  }
);

// Get account information
client.account().then((response) => client.logger.log(response.data));

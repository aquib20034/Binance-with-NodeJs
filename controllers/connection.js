const { Spot } = require("@binance/connector");
require("dotenv").config({ path: "../.env" });

const client = new Spot(
  process.env.BINANCE_API_KEY,
  process.env.BINANCE_SECRET_KEY,
  {
    baseURL: process.env.BINANCE_BASE_URL,
  }
);

// Get account information
// client.account().then((response) => client.logger.log(response.data));
async function placeMarketOrder() {
  const order = await client.newOrder("BNBUSDT", "BUY", "MARKET", {
    // price: "300.00",
    // quantity: 1,
    // timeInForce: "GTC",
    quoteOrderQty: 100,
  });

  console.log(order.data);
}

// placeMarketOrder();

async function placeLimitOrder() {
  const order = await client.newOrder("BNBUSDT", "BUY", "LIMIT", {
    price: "250",
    quantity: 10,
    timeInForce: "GTC",
  });

  console.log(order);
}

placeLimitOrder();
4;

async function coinInfo(symbol) {
  const coinInfo = await client.exchangeInfo({ symbol: symbol });
  const minQty = parseFloat(coinInfo.data.symbols[0].filters[1].minQty);
  return minQty.toString().split(".")[1].length;
}
coinInfo("BNBUSDT");

async function amountToQuantity(amount, price, minNotValueCount) {
  const quantity = await parseFloat(
    parseFloat((1 / price) * amount).toFixed(minNotValueCount)
  );
  return quantity;
}

// async function placeLimitOrder(symbol, amount, price) {
//   try {
//     const minNotValueCount = await coinInfo(symbol);
//     const quantity = await amountToQuantity(amount, price, minNotValueCount);
//     const order = await client.newOrder(symbol, "BUY", "LIMIT", {
//       price: price,
//       quantity: quantity,
//       timeInForce: "GTC",
//     });
//     console.log(order.data);
//   } catch (error) {
//     console.log(error.response.data.msg);
//   }
// }

// placeLimitOrder("BNBUSDT", 10, 220);

async function placeOrder() {
  client
    .newOCOOrder("ETHUSDT", "BUY", 1, 150, 200, {
      stopLimitPrice: 155,
      stopLimitTimeInforce: "GTC",
    })
    .then((response) => client.logger.log(response.data))
    .catch((error) => client.logger.error(error));
}
placeOrder();

client
  .cancelOCOOrder("ETHUSDT", {
    orderListId: 52,
  })
  .then((response) => client.logger.log(response.data))
  .catch((error) => client.logger.error(error));

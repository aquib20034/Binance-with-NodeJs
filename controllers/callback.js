const { Spot } = require("@binance/connector");
const { WebsocketStream } = require("@binance/connector");
require("dotenv").config({ path: "../.env" });

const client = new Spot(
  process.env.BINANCE_API_KEY,
  process.env.BINANCE_SECRET_KEY,
  {
    baseURL: process.env.BINANCE_BASE_URL,
  }
);

const callbacks = {
  open: () => console.log("Connected with Websocket server"),
  close: () => console.log("Disconnected with Websocket server"),
  message: (data) => console.log(data),
};

const websocketStreamClient = new WebsocketStream({
  callbacks,
  wsURL: "https://testnet.binance.vision",
});

function connectCallback() {
  client.createListenKey().then((response) => {
    console.log(response.data.listenKey);
    websocketStreamClient.userData(response.data.listenKey);
  });
}

connectCallback();

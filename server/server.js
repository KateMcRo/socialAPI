const express = require("express");
const app = express();
const PORT = 4001;
const api = require("./api");
const db = require("./config/connection.js");

app.use(express.json());

app.use("/api", api);
async function start() {
  await db;
  app.listen(PORT, () => {
    console.log("running");
  });
}

start();

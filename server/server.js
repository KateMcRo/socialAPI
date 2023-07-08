const express = require("express");
const app = express();
const PORT = 4001;
const api = require("./api");

app.use("/api", api);

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});

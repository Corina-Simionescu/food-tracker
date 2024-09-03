require("dotenv").config();
const express = require("express");

const connectDatabase = require("./config/database.js");
const routes = require("./routes/index.js");

const app = express();
const port = process.env.PORT;

app.use(express.json());

connectDatabase();

if (process.env.NODE_ENV === "production") {
  //:)
} else {
  app.use("/", routes);
}

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

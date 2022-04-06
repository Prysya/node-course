const express = require("express");
const path = require("path");

const router = require("./routes");
const { errorHandler } = require("./middlewares");

require("dotenv").config();

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}`);
});

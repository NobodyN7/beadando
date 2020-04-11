const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

//Database connection
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to database " + config.database);
});

const app = express();

const users = require("./routes/users");
const products = require("./routes/products");
const port = 5000;

//Middlewares
app.use(cors());

app.use(express.static(path.join(__dirname, "public/dist")));

app.use(bodyParser.json());

//passport
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/users", users);
app.use("/products", products);

//Index
app.get("/", (req, res) => {
  res.send("Invalid Endpoint");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/dist/index.html"));
});

//Start
app.listen(port, () => {
  console.log("Server started on port " + port);
});

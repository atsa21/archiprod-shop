const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const categoriesRoutes = require("./routes/categories");
const brandsRoutes = require("./routes/brands");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");

const app = express();

const password = "8gI5bWUPYIB8XIAH";

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://ts21ann:" + password + "@skillhub.qr25lpk.mongodb.net/archiprod")
.then(() => {
    console.log("Connected database!");
})
.catch(() => {
    console.log("Connection failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/categories", categoriesRoutes);
app.use("/api/brands", brandsRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/user", usersRoutes);

module.exports = app;
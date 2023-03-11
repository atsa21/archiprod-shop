const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const categoriesRoutes = require("./routes/categories");

const app = express();

const password = "8gI5bWUPYIB8XIAH";

mongoose.connect("mongodb+srv://ts21ann:" + password + "@skillhub.qr25lpk.mongodb.net/archiprod?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected database!");
})
.catch(() => {
    console.log("Connection failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/categories", categoriesRoutes);

module.exports = app;
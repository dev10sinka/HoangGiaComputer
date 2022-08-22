const { request } = require("express");
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const { ObjectID } = require("bson");
const Product = mongoose.model("Product");

router.get("/category/", (req, res) => {
  res.render("main/all-product")
});

router.get("/all-product-by-category", async (req, res) => {
  let data = await Product.find({ categoryName: req.query.categoryName });
  res.send(data);
});

module.exports = router;

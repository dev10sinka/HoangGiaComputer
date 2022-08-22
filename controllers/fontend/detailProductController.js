const { request } = require("express");
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const { ObjectID } = require("bson");
const Product = mongoose.model("Product");

router.get("/detail-product/", (req, res) => {
  res.render("main/detail-product")
});

router.get("/get-product-detail", async (req, res) => {
  let data = await Product.find({ _id: ObjectID(req.query.id) });
  res.send(data);
});

router.get("/get-product-relate", async (req, res) => {
  let data = await Product.find({ categoryName: req.query.categoryName });
  res.send(data);
});


module.exports = router;

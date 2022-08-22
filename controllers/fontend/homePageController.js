const { request } = require("express");
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Product = mongoose.model("Product");
const Category = mongoose.model("Category");


router.get('/', (req, res) => {
  res.render('main/homepage')
})

router.get("/category/get-all-category", async (req, res) => {
  let data = await Category.find({})
  res.send(data)
});

router.get("/category/get-all-product-by-category", async (req, res) => {
  let postSuccess = await Product.aggregate([
    {
      $group : { _id : "$categoryName", product: { $push: "$$ROOT" } }
    },
  ])
  res.send(postSuccess);
});

module.exports = router;

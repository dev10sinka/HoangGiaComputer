const mongoose = require("mongoose");
var product = new mongoose.Schema({
  productName: {type: String},
  categoryName: {type: String},
  price: {type: Number},
  image: {type: Array},
  origin: {type: String},
  color: {type: String},
  thickness: {type: String},
  discount: {type: Number},
  describe: {type: String},
  dateCreate: {type: String},
});

mongoose.model("Product", product);
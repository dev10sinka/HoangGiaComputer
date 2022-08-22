const mongoose = require("mongoose");
var category = new mongoose.Schema({
  categoryName: {type: String},
});

mongoose.model("Category", category);
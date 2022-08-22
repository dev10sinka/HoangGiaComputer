const mongoose = require("mongoose");
var user = new mongoose.Schema({
  username: {type: String},
  password: {type: String},
  email: {type: String},
  firstname: {type: String},
  role: {type: String},
  timeCreate: {type: String},
});
mongoose.model("User", user);
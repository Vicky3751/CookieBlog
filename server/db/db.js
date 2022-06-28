const mongoose = require("mongoose");

const connect = mongoose.connect(
  "mongodb+srv://Vinayaka:Vinayaka@vicky.jz4bvkd.mongodb.net/cookieBlog?retryWrites=true&w=majority"
);


module.exports = connect;

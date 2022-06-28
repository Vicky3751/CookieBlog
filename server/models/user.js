const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:{
    type: String,
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type: String,
  },
  phone:{
    type: Number,
  },
  img:{
    type:String
  },
  about:{
    type: String
  },
  theme:{
    type:String
  },
  canShare:{
    type: String
  },
  otp:{
    type: String
  }
},
{
  timestamps: true
});

var user = mongoose.model("User", userSchema);

module.exports = user; 
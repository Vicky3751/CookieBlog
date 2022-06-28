const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title:{
    type: String,
    required:true
  },
  i_img:{
    type:String
  },
  p_img:{
    type:String,
  },
  likes:{
    type: Number,
    default:0
  },
  comments:{
    type: Array
  },
  linkId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  linkName:{
    type:String
  }
},
{
  timestamps: true
});

var post = mongoose.model("Post", postSchema);

module.exports = post;
const express = require("express");
const Post = require("../models/post");
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
const router = express.Router();



router.get("/", async (req, res) => {
  const page = req.query.page
  const limit = req.query.limit
  console.log(page,limit)
  const post = await Post.find().limit(limit).skip(page*limit).sort({$natural:-1});      //page -2 and limit -3
  try {
    res.status(200).send(post);
    
  } catch (error) {
    
    res.status(500).send(error);
  }
});


// 1. get all posts 
// 2. get my profile posts 
// 3. get one peron profile 
// 4. add post 
// 5. update post 
// 6. delete post 
// 7. like update 
// 8. comment update 
// 9. saved count 

router.post("/addpost", async (req, res)=>{
    const post = await new Post({
        title: req.body.title,
        i_img: req.body.i_img,
        linkId:req.body.linkId,
        linkName:req.body.linkName,
        p_img:req.body.p_img
      });
      post.save();
      res.send(post);
})

router.get("/post/", async (req, res)=>{
  const id =mongoose.Types.ObjectId(req.query.id)
  if(!ObjectId.isValid(`${id}`) ){
    res.send("IID")
  }
  const post = await Post.findOne({_id:id},{title: 1, i_img:1})
  try {
    res.send(post)
  } catch (error) {
    res.send(error)
  }
})


router.put("/updatepost", async(req,res)=>{

  try {
    const post = await Post.updateOne({_id:req.body._id}, {title:req.body.title, i_img:req.body.i_img})
    res.send(post)
  } catch (error) {
    res.send(error)
  }
})

router.delete("/delete", async(req,res)=>{
  try {
    await Post.deleteOne({_id:req.query.id})
    res.send("DS")
  } catch (error) {
    res.send(error)
  }
})

router.get("/:id", async (req, res)=>{
  const id =mongoose.Types.ObjectId(`${ req.params.id}`)
  if(!ObjectId.isValid(`${id}`) ){
    res.send("IID")
  }
  const posts = await Post.find({linkId:id})
  try {
    res.send(posts)
  } catch (error) {
    res.send(error)
  }
})


module.exports = router;

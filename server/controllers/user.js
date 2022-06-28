const express = require("express");
const nodemailer = require("nodemailer");
const User = require("../models/user");
const Post = require("../models/post");

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("ALL Users");
});
router.get("/:id", async(req, res)=>{
  const id = req.params.id;
  const user = await User.findById({_id:id});
  // console.log(user)
  res.send(user);
})

// 1. login
// 2. send otp
// 3. register
// 4. update password
// 5. settings update 
// 6. update profile 
// 7. delete profile 
// 8. show one profile 
// 9. saved posts 

router.post("/login",async (req, res)=> {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.send("IE");
  }
  if(user.password != req.body.password){
    return res.send("IP");
  }
  try {
    // console.log(user)
    res.send(user);
  } catch (error) {
    console.log(error);
  }
})

router.post("/adduser", async (req, res)=> {
  const email = await User.findOne({email:req.body.email})
  if(email){
    res.status(200).send("EE")
    return
  }else{

    const user = await new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    })
    try {
      user.save()
      res.status(200).send(user)
    } catch (error) {
      res.status(500).send(error)
    }
  }
})


router.put("/:_id", async (req, res) => {
  const user = req.body;
  const editUser = new User(user);
  // console.log(editUser)
  try {
    await User.updateOne({ _id: req.params._id }, editUser);
    const posts = await Post.find({linkId : req.params._id})
    await Post.updateMany({linkId : req.params._id},{linkName : editUser.name , p_img: req.body.img })
    res.json(editUser);
  } catch (error) {
    console.log(error);
  }
});




// for otp

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "Gmail",

  auth: {
    user: "vinnuvinayaka10@gmail.com",
    pass: "yvdfvoptbhczksnu",
  },
});



router.post("/otpsend", async (req, res)=> {
  
var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
// console.log(otp);
//   console.log("first")
  const user = await User.findOne({ email: req.body.email });
  // const updateOtp = await User.
  user.otp = otp
  if(!user){
    res.send("IE")
  }

  var mailOptions = {
    to: req.body.email,
    subject: "Otp for registration is: ",
    html:
      "<h3>OTP for account verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp +
      "</h1>", // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    res.render("otp");
  });

  try {
    await User.updateOne({ email: req.body.email },user );
    // console.log(user)
    // updateduser.save()
    res.status(200).send({user, otp})
  } catch (error) {
    res.status(500).send(error)
  }



});
router.post("/otpresend", async (req, res) =>{
  const user = await User.findOne({ email: req.body.email });
  // const updateOtp = await User.
  user.otp = otp
  if(!user){
    res.send("IE")
  }

  var mailOptions = {
    to: req.body.email,
    subject: "Otp for registration is: ",
    html:
      "<h3>OTP for account verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp +
      "</h1>", // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.render("otp", { msg: "otp has been sent" });
  });
  try {
    
    res.status(200).send(user.otp)
  } catch (error) {
    res.status(500).send(error)
  }


});

router.post("/updatepassword", async (req,res)=> {
  const user = await User.findOne({ email: req.body.email });
  if(!user){
    res.send("IE")
  }
  if(req.body.otp != user.otp){
  await  res.send("IO")
  }
  if(req.body.password != req.body.repassword ){
    res.send("PDM")
  }

  try {
    user.password = req.body.password
    await User.updateOne({ email: req.body.email },user );
    res.status(200).send(user.otp)
  } catch (error) {
    res.status(500).send(error)
  }

})




module.exports = router;

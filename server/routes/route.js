const express = require("express");

const router = express.Router();

router.use("/users", require("../controllers/user.js"));
router.use("/posts", require("../controllers/post.js"));

module.exports = router;

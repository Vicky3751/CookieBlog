const express = require("express");
const app = express();
const cors = require("cors");
const myParser = require("body-parser");
const connect = require("./db/db");
const cookieParser = require("cookie-parser");
// app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(myParser.json({limit: '5000mb'}));
app.use(myParser.urlencoded({limit: '5000mb', extended: true}));




app.use("/", require("./routes/route"));

connect
  .then(() => {
    app.listen(8000, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.log(err);
  });

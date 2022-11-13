const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const app = express();
const port = 3001;
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/send", cors(), (req, res) => {
  res.send("ok");
  console.log(req.body);
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY,
  });
  mg.messages
    .create("sandbox510239168cb445588c02607a3cb0d064.mailgun.org", {
      from: req.body.email,
      to: [process.env.EMAIL],
      subject: `Contact Request from ${req.body.name}`,
      text: req.body.message,
    })
    .then((msg) => console.log(msg)) // logs response data
    .catch((err) => console.log(err)); // logs any error;
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

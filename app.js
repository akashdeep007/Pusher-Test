var express = require("express");
var bodyParser = require("body-parser");
var Pusher = require("pusher");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const pusher = new Pusher({
  appId: "1150077",
  key: "a3882ec869be1a9d8ade",
  secret: "c06022e35c92b8d6ec6d",
  cluster: "ap2",
  useTLS: true,
});

app.post("/message", function (req, res) {
  var message = req.body.message;
  pusher.trigger("public-chat", "message-added", { message });
  res.sendStatus(200);
});

app.get("/", function (req, res) {
  res.sendFile("/public/index.html", { root: __dirname });
});

app.use(express.static(__dirname + "/public"));

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`app listening on port ${port}!`);
});

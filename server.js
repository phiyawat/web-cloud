var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("port", process.env.PORT || 5000);

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// views is directory for all template files
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.send("<h1>Hello Checkpoint.js</h1>");
});

app.post("/Privacy", function(req, res) {});

// beware of port to cloud
app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"));
});

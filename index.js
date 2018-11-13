var express = require("express");
var app = express();
var list = require("./list");
// var bodyParser = require("body-parser");
// var request = require("request");
app.set("port", process.env.PORT || 5000);

app.use(express.static(__dirname + "/public"));

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
  res.send("<h1>Hello Node.js</h1>");
});

app.get("/list", function(req, res) {
  res.json(list.findAll());
});

app.get("/list/:id", function(req, res) {
  var id = req.params.id;
  res.json(list.findById(id));
});

app.post("/newlist", function(req, res) {
  var json = req.body;
  res.send("Add new " + json.name + " Completed!");
});

// app.post("/card", function(req, res) {
//   var data = req.body;
//   var dataString =
//     "card[name]=JOHN DOE&card[number]=" +
//     data.number +
//     "&card[security_code]=" +
//     data.code +
//     "&card[expiration_month]=" +
//     data.expireMonth +
//     "&card[expiration_year]=" +
//     data.expireYear;
//   request.post(
//     "https://vault.omise.co/tokens",
//     {
//       auth: {
//         user: publicKey
//       },
//       body: dataString
//     },
//     function(error, response, body) {
//       res.send(body);
//     }
//   );
// });

// app.post("/charges", function(req, res) {
//   var data = req.body;
//   var dataString =
//     "description=Charge for order 3947&amount=" +
//     data.prices +
//     "&currency=thb&return_uri=http://www.example.com/orders/3947/complete&card=" +
//     data.tokens;
//   request.post(
//     "https://api.omise.co/charges",
//     {
//       auth: {
//         user: privateKey
//       },
//       body: dataString
//     },
//     function(error, response, body) {
//       res.send(body);
//     }
//   );
// });

app.get("/index", function(req, res) {
  res.send("<h1>This is index page</h1>");
});

// beware of port to cloud
app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"));
});

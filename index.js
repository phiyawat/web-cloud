var express = require("express");
var app = express();
var list = require("./list");
var bodyParser = require("body-parser");
var request = require("request");
var publicKey = "pkey_test_5dk77lui11gdmmp9jc4";
var privateKey = "skey_test_5dk77lui9m6jv0s33pp";

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

app.post("/card", function(req, res) {
  var data = req.body;
  var dataString =
    "card[name]=JOHN DOE&card[number]=" +
    data.number +
    "&card[security_code]=" +
    data.code +
    "&card[expiration_month]=" +
    data.expireMonth +
    "&card[expiration_year]=" +
    data.expireYear;
  request.post(
    "https://vault.omise.co/tokens",
    {
      auth: {
        user: publicKey
      },
      body: dataString
    },
    function(error, response, body) {
      res.send(body);
    }
  );
});

app.post("/charges", function(req, res) {
  var data = req.body;
  var dataString =
    "description=Charge for order 3947&amount=" +
    data.prices +
    "&currency=thb&return_uri=http://www.example.com/orders/3947/complete&card=" +
    data.tokens;
  request.post(
    "https://api.omise.co/charges",
    {
      auth: {
        user: privateKey
      },
      body: dataString
    },
    function(error, response, body) {
      res.send(body);
    }
  );
});

app.post("/bluePay", function(req, res) {
  // let data = req.body;
  let dataString =
    "MERCHANT=100144703153" +
    "&TAMPER_PROOF_SEAL=74acff4399d6d72dbcab8dc130038ef9" +
    "&TRANSACTION_TYPE=SALE" +
    "&AMOUNT=3.00" +
    "&NAME1=BluePay Customer" +
    "&CC_NUM=4111111111111111" +
    "&CC_EXPIRES=1215";
  request.post(
    "https://secure.bluepay.com/interfaces/bp10emu",
    {
      body: dataString
    },
    function(error, response, body) {
      res.send(body);
    }
  );
});

app.get("/index", function(req, res) {
  res.send("<h1>This is index page</h1>");
});

// beware of port to cloud
app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"));
});

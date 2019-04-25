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
  res.send(
    "<meta property='og:image' content='https://firebasestorage.googleapis.com/v0/b/my-project-9d06f.appspot.com/o/image%2F46453079_289614934991275_4718699032732499968_n.jpg?alt=media&token=cf42a6d3-cd02-455e-aadc-04fc477295a2' />" +
      "<meta property='og:url' content='https://phiyawat-comsci.herokuapp.com/'>" +
      "<meta property='og:type' content='website'/>" +
      "<meta property='og:title' content='phiyawat-comsci.herokuapp.com'/>" +
      "<meta property='og:description' content='TU more sheet แหล่งซื้อขายชีทสรุปของธรรมศาสตร์'/>" +
      "<meta property='fb:app_id' content='512026392655945'"
  );
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

app.post("/confirm", function(req, res) {
  var data = req.body;
  var headers = {
    "Content-Type": "application/json",
    "X-LINE-ChannelId": "1634944383",
    "X-LINE-ChannelSecret": "61ccd09a220863c54c519a88cba9d1d1",
    "X-LINE-MerchantDeviceProfileId": "DEVICE PROFILE ID"
  };
  var dataString = {
    amount: data.prices,
    currency: "THB"
  };
  request.post(
    "https://sandbox-api-pay.line.me/v2/payments/" +
      data.transactionId +
      "/confirm",
    {
      headers: headers,
      body: JSON.stringify(dataString)
    },
    function(error, response, body) {
      res.send(body);
    }
  );
});

app.post("/linePay", function(req, res) {
  var data = req.body;
  var headers = {
    "Content-Type": "application/json",
    "X-LINE-ChannelId": "1634944383",
    "X-LINE-ChannelSecret": "61ccd09a220863c54c519a88cba9d1d1",
    "X-LINE-MerchantDeviceProfileId": "DEVICE PROFILE ID"
  };
  var dataString = {
    productName: "TUMoreSheet",
    amount: data.prices,
    currency: "THB",
    orderId: data.date,
    confirmUrl: "https://moresheet.co/BuyComplete",
    cancelUrl: "https://moresheet.co/BuyCancel"
  };
  request.post(
    "https://sandbox-api-pay.line.me/v2/payments/request",
    {
      headers: headers,
      body: JSON.stringify(dataString)
    },
    function(error, response, body) {
      res.send(body);
    }
  );
});

app.post("/confirmPrompt", function(req, res) {
  var data = req.body;
  var headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  var dataString = {
    ID: data.transactionId,
    secret: "moresheet88724"
  };
  request({
		  url:"https://poomrokc.services:4242/confirm",
		  method:"POST",
		  headers: headers,
		  form: dataString
	},
    function(error, response, body) {
      res.send(body);
    }
  );
});

app.post("/promptPay", function(req, res) {
  var data = req.body;
  var headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  var dataString = {
    fourDigit: data.fourDigit,
    amount: data.prices,
    time: data.time,
	secret:"moresheet88724"
  };
  request({
		  url:"https://poomrokc.services:4242/createTrans",
		  method:"POST",
		  headers: headers,
		  form: dataString
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

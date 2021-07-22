// Dependencies
var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

//Setup Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

var reservations = [];
var waitingList = [];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/tables", function(req, res) {
    return res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitingList);
});

app.get("/api/lenghts", function (req,res) {
    return res.json({resLength: reservations.length, waitLength: waitingList.length});
})

app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newTable = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    reservations.push(newTable);

    res.json(newTable);
});

app.post("/api/waitlist", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newTable = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    waitingList.push(newTable);

    res.json(newTable);
});
  

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
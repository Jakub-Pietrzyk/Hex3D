var express = require("express");
var app = express();
const PORT = 3000;
var path = require("path");
var bodyParser = require("body-parser");
var hbs = require('express-handlebars');

var levels = [];
var HEX_TYPES = [{name: "WALLS", first: true}, {name: "ENEMY", first: false}, {name: "TREASURE", first: false}, {name: "LIGHT", first: false}]

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ defaultLayout: 'levelEditor.hbs' }));
app.set('view engine', 'hbs');

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT );

    app.get("/", function(req,res){
      console.log("Zapytanie " + req.method + " na adres: " + req.url + " - params: " + JSON.stringify(req.query));
      res.render("index.hbs", {types: HEX_TYPES});
    })

    app.get("/hex", function(req,res){
      console.log("Zapytanie " + req.method + " na adres: " + req.url + " - params: " + JSON.stringify(req.query));
      res.render("hex.hbs", {layout: "hex3D.hbs"});
    })

    app.post("/saveLevel",function(req,res){
      console.log("Zapytanie " + req.method + " na adres: " + req.url + " - params: " + JSON.stringify(req.query));
      levels.push(JSON.parse(req.body.level));
      res.redirect("/");
    })

    app.post("/getLevel",function(req,res){
      console.log("Zapytanie " + req.method + " na adres: " + req.url + " - params: " + JSON.stringify(req.query));
      if(levels.length > 0) {
        var level = levels[levels.length-1]
        res.json(JSON.stringify(level));
      } else {
        res.json("NO_LEVEL");
      }
    })

})

var express = require("express");
var app = express();
const PORT = 3000;
var path = require("path");
var bodyParser = require("body-parser");
var hbs = require('express-handlebars');

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));
app.set('view engine', 'hbs');

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT );

    app.get("/", function(req,res){
      console.log("Zapytanie " + req.method + " na adres: " + req.url + " - params: " + JSON.stringify(req.query));
      res.render("index.hbs");
    })

})

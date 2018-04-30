var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.use(session({secret: 'codingdojorocks'})); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    if (req.session.counter == null) {
        req.session.counter = 1;
    }
    else {
        req.session.counter++
    }
    
    res.render('index', {counter: req.session.counter});
})

app.post('/counter', function(req, res) {
    req.session.counter++
    res.redirect('/');
})
app.post('/reset', function(req, res) {
    req.session.counter = 0
    res.redirect('/');
})

app.listen(8000, function() {
    console.log("Power Overwhelming...");
})
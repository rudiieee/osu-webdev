var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 9566);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
    var queryParams = [];
    for (var param in req.query){
        queryParams.push({'name':param,'value':req.query[param]})
    }
    var data = {};
    data.urlList = queryParams;
    res.render('get-page', data);
});

app.post('/',function(req,res){
    var queryParams = [];
    var bodyParams = [];
    for (var param in req.query){
        queryParams.push({'name':param,'value':req.query[param]})
    }
    for (var param in req.body){
        bodyParams.push({'name':param,'value':req.body[param]})
    }
    var data = {};
    data.urlList = queryParams;
    data.bodyList = bodyParams;
    res.render('post-page', data);
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://flip2.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
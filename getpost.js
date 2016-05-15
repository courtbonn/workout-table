var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3001);

app.get('/',function(req,res){
  res.render('home.handlebars') //We can omit the .handlebars extension as we do below
});


app.get('/data',function(req,res){
  var parameters = [];
  for (var p in req.query){
    parameters.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = parameters;
  res.render('get-page',context);
});

app.post('/data',function(req,res){
  var parameters = [];
  for (var p in req.body){
    parameters.push({'name':p,'value':req.body[p]})
  }
  console.log(parameters);
  console.log(req.body);
  var context = {};
  context.dataList = parameters;
  res.render('post-page', context);
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
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});


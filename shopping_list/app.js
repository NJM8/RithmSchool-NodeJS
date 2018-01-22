const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));

let items = [];

app.get('/', function(request, response){
	return response.redirect('/items');
});

app.get('/items', function(request, response){
	return response.render('items', {items});
});

app.get('/items/new', function(request, response){
	return response.render('add-item');
});

app.post('/items', function(request, response){
	items.push([`${request.body.item}: ${request.body.price}`]);
	return response.redirect('/');
});

app.listen('8000', function(){
	console.log("Serving app on port 8000");
});
const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + "/public"));

app.get('/', function(request, response){
	const firstName = 'Nate';
	return response.render('index', {name: firstName});
});

app.get('/colors', function(request, response){
	const colors = ['red', 'green', 'blue'];
	return response.render('data', {colors});
});

app.get('/extends', function(request, response){
	return response.render('hello');
})

app.listen('3000', function(){
	console.log('Ther server has started on port 3000, head over to see what is there.');
});
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'pug');

app.get('/', function(request, response){
	return response.render('login');
});

// app.get('/create-new-user', function(request, response){
// 	return response.send(request.query);
// });
app.post('/create-new-user', function(request, response){
	return response.send(request.body);
})

app.post('/data', function(request, response){
	console.log('We create/update/delete some data here');
	return response.send(request.body);
})

// this is how you would usually redirect the post request after receiving the data
// app.get("/", function(request, response) {
//   return response.render("welcome");
// });

// app.post("/data", function(request, response) {
//   console.log("We create/update/delete some data here");
//   return response.redirect("/"); // respond to the browser with a header called location and a value of '/'. The browser will see the header and immidiately issue a GET request to '/', where our server will respond by rendering the welcome page.
// });


app.listen('8000', function(){
	console.log('Listening on port 8000');
});
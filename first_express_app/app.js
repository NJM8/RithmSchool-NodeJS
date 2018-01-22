const express = require('express');

const app = express();

app.get('/', function(request, response){
	return response.send('Good Day!');
});

app.get('/students/:firstName', function(request, response){
	return response.send(
		`The name of this student is ${request.params.firstName}`
		);
});

app.listen(3000, function(){
	console.log('The app has started on port 3000. Head to localhost:3000 and see what is there!');
})
const http = require('http');

let dataOne = '';
let dataTwo = '';
let dataThree = '';

// note this is an ugly hacky and inflexible way to do this. It should be done using Promise.all and the spread operator to capture any number of arguements, see below

// http.get(process.argv[2], function(response){
// 	response.setEncoding('utf8');

// 	response.on('data', function(chunk){
// 		dataOne += chunk;
// 	})

// 	response.on('end', function(){
// 		http.get(process.argv[3], function(response){
// 			response.setEncoding('utf8');

// 			response.on('data', function(chunk){
// 				dataTwo += chunk;
// 			})

// 			response.on('end', function(){
// 				http.get(process.argv[4], function(response){
// 					response.setEncoding('utf8');

// 					response.on('data', function(chunk){
// 						dataThree += chunk;
// 					})

// 					response.on('end', function(){
// 						console.log(dataOne);
// 						console.log(dataTwo);
// 						console.log(dataThree);
// 					})
// 				}).on('error', function(){
// 					console.log(error);
// 				})
// 			})
// 		}).on('error', function(){
// 			console.log(error);
// 		})
// 	})
// }).on('error', function(){
// 	console.log(error);
// });


function getData(location){
	return new Promise(function(resolve, reject){
		http.get(location, function(response){
			response.setEncoding('utf8');
			let data = '';

			response.on('data', function(chunk){
				data += chunk;
			})

			response.on('error', function(){
				reject(error);
			})

			response.on('end', function(){
				resolve(data);
			})
		}).on('error', function(){
			reject(error);
		})	
	})
}

async function getDataAsync(location){
	let data = await getData(location);
	return data;
}

let callsToMake = [];

function populateCalls(links){
	links.forEach((element, index) => {
		if (index > 1) {
			callsToMake.push(getDataAsync(element));
		}
	})
}

populateCalls(process.argv);

Promise.all(callsToMake).then(function(data){
	data.forEach(item => console.log(item));
});

// Much prettier!













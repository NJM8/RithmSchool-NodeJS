const fs = require('fs');

let lines = 0;

let file = function(){
	fs.readFile(process.argv[2], 'utf8', function(err, data){
		if (err) {
			throw err;
		} else {
			lines = data.split('\n').length - 1;
			console.log(lines);
		}
	});
}

file();
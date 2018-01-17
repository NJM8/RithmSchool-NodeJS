const modularHelper = require('./modularHelper');

let getFiles = function(){
	modularHelper(process.argv[2], process.argv[3], function(err, files){
		if (err) {
			throw err;
		} else {
			files.forEach(file => console.log(file));
		}
	});
}

getFiles();

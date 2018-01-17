const fs = require('fs');
const path = require('path');

module.exports = function(fileLocation, filterName, callback){
	fs.readdir(fileLocation, function(err, data){
		if (err) {
			return callback(err);
		} else {
			let files = data.filter(element => path.extname(element) === `.${filterName}`);
			callback(null, files);
		}
	});
}
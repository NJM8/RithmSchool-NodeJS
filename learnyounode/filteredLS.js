const fs = require('fs');
const path = require('path');

let location = process.argv[2];
let preferredExtension = `.${process.argv[3]}`;

fs.readdir(location, function(err, list){
	if (err) {
		throw err;
	} else {
		list.forEach((element) => {
			if (path.extname(element) === preferredExtension) {
				console.log(element);
			}
		})
	}
});




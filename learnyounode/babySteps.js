
let numbers = [];

process.argv.forEach((element, index) => {
	if (index > 1) {
		numbers.push(Number(element));
	}
});

let sum = numbers.reduce((a, b) => a + b);

console.log(sum);
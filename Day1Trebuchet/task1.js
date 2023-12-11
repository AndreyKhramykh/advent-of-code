function getNumbers(arg) {
	let resultArray = []
	let array = arg.split('\n')
	array.forEach(elem => {
		let element = elem.split('');
		let a = element.find(elem => elem == Number(elem))
		let b = element.reverse().find(elem => elem == Number(elem))
		let result = a + b
		resultArray.push(result)

	})
	let answer = resultArray.reduce((acc, curr) => +acc + +curr)
	console.log(`output->answer`,answer)
}

const fs = require('node:fs');

const samplePath = 'adventOfCode2023/Day1Trebuchet/sample.txt'
const fullPath = 'adventOfCode2023/Day1Trebuchet/full.txt' 
const partPath = 'adventOfCode2023/Day1Trebuchet/part.txt'

fs.readFile(fullPath, 'utf-8', (error, data) => {
	if (error) {
		console.log(`output->error`,error)
	}
	getNumbers(data)
})







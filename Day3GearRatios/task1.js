function getSum(arg) {
	const regNum = /\d+/g
	const regSymbols = /[=+\-*\/&%#@\$]/g
	let data = arg.split('\n')
	function transformData(array) {
		const lineLength = array[0].length
		array.unshift(Array(lineLength).fill('.').join(''))
		array.push(Array(lineLength).fill('.').join(''))
		array = array.map(line => {
			line = line.split('')
			line.unshift('.')
			line.push('.')
			return line.join('')
		})
		return array
	}
	data = transformData(data)

	const resultArray = []
	data.forEach((currentLine, lineIndex) => {
		if (currentLine.match(regNum)) {
			currentLine.match(regNum).forEach(number => {
				const startIndex = currentLine.indexOf(number)
				const endIndex = startIndex + number.length - 1
				const rangeToCheck = [
					...data[lineIndex - 1].slice(startIndex - 1, endIndex + 2),
					...data[lineIndex].slice(startIndex - 1, endIndex + 2),
					...data[lineIndex + 1].slice(startIndex - 1, endIndex + 2),
				].join('');
				if (rangeToCheck.match(regSymbols)) {
					resultArray.push(number)
				}
				const erasedNumber = Array(number.length).fill(' ').join('')
				currentLine = currentLine.replace(number, erasedNumber)
			})
		}
	})
	console.log(`output->resultArray sum of values`,resultArray.reduce((acc, curr) => +acc + +curr))
}



const fs = require('node:fs');

const samplePath = 'Day3GearRatios/sample.txt'
const fullPath = 'Day3GearRatios/full.txt' 
const partPath = 'Day3GearRatios/part.txt'

fs.readFile(fullPath, 'utf-8', (error, data) => {
	if (error) {
		console.log(`output->error`,error)
	}
	getSum(data)
})

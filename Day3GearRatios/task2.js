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

	const gears = {}
	const rows = data.length
	const columns = data[0].length

	function findGears(str, num, row, column) {
		for (let i = 0; i < str.length; i++) {
			const char = str.charAt(i)
			if (char === '*') {
				const charIndex = `${row}-${column + i}`
				gears[charIndex] = gears[charIndex] 
				? [...gears[charIndex], parseInt(num)] 
				: [parseInt(num)]
			}
		}
	}
	
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns; c++) {
			const char = '' + data[r][c];
			if (isNaN(char)) continue;
			let num = char;
			while (++c < columns) {
				if (Number.isInteger(parseInt(data[r][c]))) {
					num += data[r][c]
				} else {
					break
				}
			}
			const top = data[r - 1].substring(c - num.length - 1, c + 1);
			const bottom = data[r + 1].substring(c - num.length -1, c + 1);
			const left = data[r][c - num.length - 1];
			const right = data[r][c];

			findGears(top, num, r - 1, c - num.length - 1)
			findGears(bottom, num, r + 1, c - num.length - 1)
			findGears(left, num, r, c - num.length - 1)
			findGears(right, num, r, c)
		}
	}
	const result = Object.values(gears)
	.filter(x => x.length === 2)
	.map(x => x[0] * x[1])
	.reduce((acc, curr) => acc + curr)

	console.log(`output->gears`, result)
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

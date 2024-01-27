function getResult(arg) {
	function transformData(data) {
		return data.split('\n').map(line => {
			return {array: line.split(' ').map(num => Number(num))}
		})
	}
	const data = transformData(arg)
	function getHistory(arr) {
		let resultArray = []
		resultArray.push(arr)
		let line = []
		let currentLine = arr
		while (!currentLine.every(num => num == 0)) {
			for (let i = 1; i < currentLine.length; i++) {
				line.push(currentLine[i] - currentLine[i - 1])
			}
			currentLine = line
			line = []
			resultArray.push(currentLine)
		}
		return resultArray
	}
	function getExtrapolarValue(arg) {
		arg.reverse()
		for (let i = 0; i < arg.length - 1; i++) {
			let result = arg[i + 1][0] - arg[i][0]
			arg[i + 1].unshift(result)
		}
		return arg[arg.length - 1][0]
	}
	const result = data.map(obj => {
		return getExtrapolarValue(getHistory(obj.array))
	}).reduce((acc, cur) => acc + cur)
	console.log(`output->data`,result)
}

const fs = require('node:fs')

const samplePath = 'Day9/sample.txt'
const fullPath = 'Day9/full.txt'

fs.readFile(fullPath, 'utf-8', (error, data) => {
	if (error) {
		console.log(`output->error`, error)
	}
	getResult(data)
})

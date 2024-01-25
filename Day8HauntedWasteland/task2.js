function getSteps(arg) {
	const transformData = (data) => {
		let instruction = data
			.split('\n')[0]
			.replace(/L/g, 0)
			.replace(/R/g, 1)
			.split('')
		let map = {}
		data
			.split('\n')
			.slice(2)
			.forEach((line) => {
				let key = line.split('=')[0].trim()
				let value = line.split('=')[1].trim().replace(/[()]/g, '').split(', ')
				map[key] = value
			})
		return { instruction, map }
	}
	const data = transformData(arg)
	let endPoint = 'ZZZ'
	let resultArray = []
	let startArray = Object.keys(data.map).filter((key) => key[2] == 'A')

	for (let k = 0; k < startArray.length; k++) {
		let steps = 0
		startArray = Object.keys(data.map).filter((key) => key[2] == 'A')
		for (let i = 0; i <= data.instruction.length; i++) {
			if (startArray[k][2] == endPoint[2]) break
			if (i == data.instruction.length) i = 0
			startArray = startArray.map((item) => {
				return (item = data.map[item][data.instruction[i]])
			})
			steps += 1
		}
		resultArray.push(steps)
	}
	function gcd(a, b) {
		return b === 0 ? a : gcd(b, a % b)
	}
	function lcm(a, b) {
		return (a * b) / gcd(a, b)
	}
	function lcmArray(numbers) {
		let result = numbers[0]
		for (let i = 1; i < numbers.length; i++) {
			result = lcm(result, numbers[i])
		}
		return result
	}
	console.log(`output->lcmArray(resultArray)`, lcmArray(resultArray))
}

const fs = require('node:fs')

const samplePath = 'Day8HauntedWasteland/sample.txt'
const fullPath = 'Day8HauntedWasteland/full.txt'

fs.readFile(fullPath, 'utf-8', (error, data) => {
	if (error) {
		console.log(`output->error`, error)
	}
	getSteps(data)
})

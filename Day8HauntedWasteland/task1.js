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
	let currentPoint = 'AAA'
	let endPoint = 'ZZZ'
	let steps = 0

	for (let i = 0; i <= data.instruction.length; i++) {
		if (currentPoint == endPoint) break
		if (i == data.instruction.length) i = 0
		currentPoint = data.map[currentPoint][data.instruction[i]]
		steps += 1
	}
	console.log(`output->steps`, steps)
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

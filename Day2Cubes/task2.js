function cubic(arg) {
	let resultArray = []
	let dataArray = arg.split('\n')
	dataArray.forEach(line => {
		let blue = []
		let green = []
		let red = []
		let gameNumber = +line.split(':')[0].split(' ')[1]
		let string = line.split(':')[1].trim()
		let attempt = string.split(';')
		attempt.forEach(element => {
			element.trim().split(',').map(item => {
				if (item.trim().split(' ')[1] == 'blue') {
					blue.push(item.trim().split(' ')[0])
				}
				if (item.trim().split(' ')[1] == 'green') {
					green.push(item.trim().split(' ')[0])
				}
				if (item.trim().split(' ')[1] == 'red') {
					red.push(item.trim().split(' ')[0])
				}
			})
		})
		resultArray.push(Math.max(...blue) * Math.max(...green) * Math.max(...red))
	})

	console.log(`output->resultArray.reduce((acc, curr) => +acc + +curr)`,resultArray.reduce((acc, curr) => +acc + +curr))
}

const fs = require('node:fs');

const samplePath = 'adventOfCode2023/Day2Cubes/sample.txt'
const fullPath = 'adventOfCode2023/Day2Cubes/full.txt' 
const partPath = 'adventOfCode2023/Day2Cubes/part.txt'

fs.readFile(fullPath, 'utf-8', (error, data) => {
	if (error) {
		console.log(`output->error`,error)
	}
	cubic(data)
})
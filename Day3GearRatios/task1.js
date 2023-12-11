function getSum(arg) {
	const regular = /\d+/g
	const data = arg.split('\n')
	
}



const fs = require('node:fs');

const samplePath = 'adventOfCode2023/Day3GearRatios/sample.txt'
const fullPath = 'adventOfCode2023/Day3GearRatios/full.txt' 
const partPath = 'adventOfCode2023/Day3GearRatios/part.txt'

fs.readFile(samplePath, 'utf-8', (error, data) => {
	if (error) {
		console.log(`output->error`,error)
	}
	getSum(data)
})

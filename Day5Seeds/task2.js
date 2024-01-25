function getLocation(arg) {
	console.log(`output->arg`,arg)
}


const fs = require('node:fs');

const samplePath = 'Day5Seeds/sample.txt'
const fullPath = 'Day5Seeds/full.txt' 
const partPath = 'adventOfCode2023/Day5Seeds/part.txt'

fs.readFile(samplePath, 'utf-8', (error, data) => {
	if (error) {
		console.log(`output->error`,error)
	}
	getLocation(data)
})

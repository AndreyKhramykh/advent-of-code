function getResult(data) {
	console.log(`output->`,data)
}
const fs = require('node:fs')

const samplePath = 'Day12/sample.txt'
const fullPath = 'Day12/full.txt'

fs.readFile(samplePath, 'utf-8', (error, data) => {
	if (error) {
		console.log(`output->error`, error)
	}
	getResult(data)
})

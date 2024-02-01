function getResult(input) {
	// Create main info - quantity and indexes of empty rows and columns, create an array with galaxies coords
	function transformData(input) {
		const emptyRowIndexes = []
		const emptyColumnIndexes = []
		const galaxiesCoords = []
		const map = input.split('\n')
		// Search empty rows indexes
		map.forEach((line, index) => {
			if (line.split('').every((elem) => elem == '.')) {
				emptyRowIndexes.push(index)
			}
		})
		// Search empty columns indexes
		for (let i = 0; i < map[0].split('').length; i++) {
			let counter = 0
			map.forEach((line) => {
				if (line.split('')[i] == '.') {
					counter += 1
				}
			})
			if (counter == map.length) {
				emptyColumnIndexes.push(i)
			}
		}
		// Search coords of Galaxies
		for (let y = 0; y < map.length; y++) {
			for (let x = 0; x < map[0].length; x++) {
				if (map[y].split('')[x] == '#') {
					galaxiesCoords.push({ y, x })
				}
			}
		}
		return { emptyRowIndexes, emptyColumnIndexes, galaxiesCoords, map }
	}

	const { emptyRowIndexes, emptyColumnIndexes, galaxiesCoords, map } =
		transformData(input)

	const result = []

	// We can expand the universe to any value thanks to this index
	let indexOfUniverseExpansion = 1000000 - 1

	// Count quantity of intersections
	let countIntersections = 0

	// Main loop
	for (let i = 0; i < galaxiesCoords.length; i++) {
		for (let j = i + 1; j < galaxiesCoords.length; j++) {

			// Count distance between galaxies without increasing the universe
			result.push(
				Math.abs(galaxiesCoords[i].y - galaxiesCoords[j].y) +
					Math.abs(galaxiesCoords[i].x - galaxiesCoords[j].x)
			)

			// Count rows intersections
			emptyRowIndexes.forEach((index) => {
				if (index < galaxiesCoords[j].y && index > galaxiesCoords[i].y) {
					countIntersections += 1
				}
			})
			
			// Count columns intersections
			emptyColumnIndexes.forEach((index) => {
				if (
					index < Math.max(galaxiesCoords[j].x, galaxiesCoords[i].x) &&
					index > Math.min(galaxiesCoords[j].x, galaxiesCoords[i].x)
				) {
					countIntersections += 1
				}
			})
		}
	}

	// Result
	console.log(
		`output->result`,
		result.reduce((acc, curr) => acc + curr) +
			countIntersections * indexOfUniverseExpansion
	)
}
const fs = require('node:fs')

const samplePath = 'Day11/sample.txt'
const fullPath = 'Day11/full.txt'

fs.readFile(fullPath, 'utf-8', (error, data) => {
	if (error) {
		console.log(`output->error`, error)
	}
	getResult(data)
})

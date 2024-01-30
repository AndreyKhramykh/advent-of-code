function getSteps(input) {
	function getData(input) {
		let map = input.split('\n')
		map.unshift(Array(map.length).fill('.').join(''))
		map.push(
			Array(map.length - 1)
				.fill('.')
				.join('')
		)
		map = map.map((line) => {
			let arrLine = line.split('')
			arrLine.unshift('.')
			arrLine.push('.')
			return arrLine.join('')
		})
		const linesQuantity = map.length
		const indexOfStartPos = map.join('').indexOf('S')
		const y = Math.floor(indexOfStartPos / linesQuantity)
		const x = map[y].split('').indexOf('S')

		return { startCoords: { y, x }, map }
	}
	const { startCoords, map } = getData(input)

	const posibleValues = {
		'|': { value: '|', direction: ['top', 'bottom'], startMatch: ['top', 'bottom'] },
		'-': { value: '-', direction: ['left', 'right'], startMatch: ['left', 'right'] },
		'L': { value: 'L', direction: ['top', 'right'], startMatch: ['bottom', 'left'] },
		'J': { value: 'J', direction: ['top', 'left'], startMatch: ['bottom', 'right'] },
		'7': { value: '7', direction: ['bottom', 'left'], startMatch: ['top', 'right'] },
		'F': { value: 'F', direction: ['bottom', 'right'], startMatch: ['top', 'left'] },
	}
	let posibleDirections = ['top', 'right', 'bottom', 'left']

	let currentCoords = startCoords

	let imposibleDirection = ''


	let steps = 0

	function getDirection() {
		let result = ''
		let currentRange = {
			top: map[currentCoords.y - 1][currentCoords.x],
			right: map[currentCoords.y][currentCoords.x + 1],
			bottom: map[currentCoords.y + 1][currentCoords.x],
			left: map[currentCoords.y][currentCoords.x - 1],
		}
		if (map[currentCoords.y][currentCoords.x] == 'S') {
			Object.entries(currentRange).forEach(entry => {
				Object.values(posibleValues).forEach(item => {
					if (entry[1] == item.value && posibleValues[entry[1]].startMatch.includes(entry[0])) {
						result = entry[0]
						posibleDirections = item.direction
					}
				})
			})
		} else {
			posibleDirections = posibleDirections.filter(e => e != imposibleDirection)
			result = posibleDirections[0]
			if (currentRange[posibleDirections[0]] != 'S') {
				posibleDirections = posibleValues[currentRange[posibleDirections[0]]].direction
			}
		}
		return result
	}

	function doStep(direction) {
		if (direction == 'top') {
			currentCoords.y -= 1
			imposibleDirection = 'bottom'
		}
		if (direction == 'right') {
			currentCoords.x += 1
			imposibleDirection = 'left'
		}
		if (direction == 'bottom') {
			currentCoords.y += 1
			imposibleDirection = 'top'
		}
		if (direction == 'left') {
			currentCoords.x -= 1
			imposibleDirection = 'right'
		}
		steps += 1
	}
	while (map[currentCoords.y][currentCoords.x] != 'S' || steps == 0) {
		doStep(getDirection())
	}
	console.log(`output->steps`,steps / 2)
}
const fs = require('node:fs')
const { resourceUsage } = require('node:process')

const samplePath = 'Day10/sample.txt'
const fullPath = 'Day10/full.txt'

fs.readFile(fullPath, 'utf-8', (error, data) => {
	if (error) {
		console.log(`output->error`, error)
	}
	getSteps(data)
})

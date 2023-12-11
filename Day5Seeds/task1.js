function getLocation(arg) {
	// Данные с диапазонами
	const actualData = []
	// Массив семян
	const currentValuesData = arg.split('\n')[0].split('seeds:').slice(1, 2)[0].trim().split(' ')
	// Преобразование данных до нужного состояния
	const initialData = arg.split('\n')
	initialData.shift()
	initialData.forEach((elem, index) => {
		if (elem == '') {
			initialData.splice(index, 1)
		}
	})
	for (let i = 0, j = -1; i < initialData.length; i++) {
		if (isNaN(Number(initialData[i][0]))) {
			actualData.push({name: initialData[i].split(' ')[0], ranges: []})
			j++
		} else {
			actualData[j].ranges.push(initialData[i])

		}

	}
	
	function getRangeBorder (range) {
		let rangeStep = Number(range.split(' ')[2])
		let rangeMinValue = Number(range.split(' ')[1])
		let rangeMaxValue = rangeMinValue + (rangeStep - 1)
		let result = [rangeMinValue, rangeMaxValue]
		return result
	}
	function getCurrentValue (value, ranges) {
		let currentValue
		for (let i = 0; i < ranges.length; i++) {
			let rangeBoarder = getRangeBorder(ranges[i])
			let rangeArray = ranges[i].split(' ')
			if (value >= rangeBoarder[0] && value <= rangeBoarder[1]) {
				currentValue = +value - +rangeBoarder[0] + +rangeArray[0]
				return currentValue
			}
		}
		return value
	}

	for (let map = 0; map < actualData.length; map++) {
		for (let i = 0; i < currentValuesData.length; i++) {
			currentValuesData[i] = getCurrentValue(+currentValuesData[i], actualData[map].ranges)
		}
	}
	console.log(`output->`,currentValuesData.reduce((acc, curr) => {
		if (curr < acc) {
			acc = curr
		}
		return acc
	}))
}


const fs = require('node:fs');

const samplePath = 'adventOfCode2023/Day5Seeds/sample.txt'
const fullPath = 'adventOfCode2023/Day5Seeds/full.txt' 
const partPath = 'adventOfCode2023/Day5Seeds/part.txt'

fs.readFile(fullPath, 'utf-8', (error, data) => {
	if (error) {
		console.log(`output->error`,error)
	}
	getLocation(data)
})

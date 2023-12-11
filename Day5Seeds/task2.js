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
	let seedRangesArray = []
	for (let i = 0; i < currentValuesData.length; i += 2) {
		seedRangesArray.push([currentValuesData[i], Number(currentValuesData[i]) + Number(currentValuesData[i + 1]) - 1])
	}

	console.log(`output->seedRangesArray`,seedRangesArray)
	// console.log(`output->actualData`,actualData)
	


}


const fs = require('node:fs');

const samplePath = 'adventOfCode2023/Day5Seeds/sample.txt'
const fullPath = 'adventOfCode2023/Day5Seeds/full.txt' 
const partPath = 'adventOfCode2023/Day5Seeds/part.txt'

fs.readFile(samplePath, 'utf-8', (error, data) => {
	if (error) {
		console.log(`output->error`,error)
	}
	getLocation(data)
})

function getPoints(arg) {
	const result = []
	arg.split('\n').forEach(card => {
		const line = []
			const numbersCardPart = card.split(':')[1].trim()
			numbersCardPart.split('|')[0].split(' ').map((winNumber) => {
					card.split(':')[1].trim().split('|')[1].split(' ').forEach(myNumber => {
						if (Number(winNumber) == Number(myNumber) && Number(myNumber) != '') {
							line.push(myNumber)
						}
					})		
				})
				if (line.length > 0) {
					result.push(Array.from({ length: line.length }, (_, index) => 2 ** index).at(-1) || 0)
				}
		}	
	)
	console.log(`output->result`,result.reduce((acc, curr) => acc + curr))
}



const fs = require('node:fs');

const samplePath = 'adventOfCode2023/Day4Scratchcards/sample.txt'
const fullPath = 'adventOfCode2023/Day4Scratchcards/full.txt' 
const partPath = 'adventOfCode2023/Day4Scratchcards/part.txt'

fs.readFile(fullPath, 'utf-8', (error, data) => {
	if (error) {
		console.log(`output->error`,error)
	}
	getPoints(data)
})

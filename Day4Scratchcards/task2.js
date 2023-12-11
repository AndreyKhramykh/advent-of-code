function getPoints(arg) {
	const winNumInCard = []
	const cardsQuantityArray = []
	const result = []
	arg.split('\n').forEach(card => {
		const line = []
		cardsQuantityArray.push([' '])
			const numbersCardPart = card.split(':')[1].trim()
			numbersCardPart.split('|')[0].split(' ').map((winNumber) => {
					card.split(':')[1].trim().split('|')[1].split(' ').forEach(myNumber => {
						if (Number(winNumber) == Number(myNumber) && Number(myNumber) != '') {
							line.push(myNumber)
						}
					})		
				})
				if (line.length > 0) {
					winNumInCard.push(Number(line.length))
				} else {
					winNumInCard.push(0)
				}
		}	
	) 
	for (let i = 0; i < cardsQuantityArray.length; i++) {
		result.push(cardsQuantityArray[i].length)
		cardsQuantityArray[i].forEach(() => {
			let currentWinsNumber = winNumInCard[i]
			let currentQuantityArrayIndex = i + 1
			while (currentWinsNumber != 0) {
				cardsQuantityArray[currentQuantityArrayIndex].push(' ')
				currentQuantityArrayIndex += 1
				currentWinsNumber -= 1
		}
		})		
	}
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

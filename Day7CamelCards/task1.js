function getWaysToRecord(arg) {
	data = arg.split('\n')

	let map = {'T': 'A', 'J': 'B', 'Q': 'C', 'K': 'D', 'A': 'E'}
	let total = 0;
	let result = [];

	function countOccurances(hand, char) {
		let occurrances = 0;
		for (let item of hand) {
			if (item == char) {
				occurrances++
			}
		}
		return occurrances;
	}

	function getHandScore(hand) {
		let counts = hand.split('').map(char => countOccurances(hand, char))
		if (counts.includes(5)) {
			return 6
		} else if (counts.includes(4)) {
			return 5;
		} else if (counts.includes(3)) {
			if (counts.includes(2)) {
				return 4;
			}
			return 3;
		} else if (counts.includes(2)) {
			if (counts.filter(el => el == 2).length == 4) {
				return 2;
			}
			return 1;
		}
		return 0;
	}
	data.forEach(line => {
		let [combo, bet] = line.split(' ');
		result.push({combo, bet: parseInt(bet)})
	})

	result.sort((a,b) => {
		let typeA = getHandScore(a.combo);
		let typeB = getHandScore(b.combo);
		if (typeA !== typeB) {
			return typeA - typeB
		} else {
			let mappedA = a.combo.split('').map(card => map[card] || card).join('');
			let mappedB = b.combo.split('').map(card => map[card] || card).join('');
			return mappedA.localeCompare(mappedB)
		}
	})

	for (let i = 0; i < result.length; i++) {
		total += result[i].bet * (i + 1)
	}
	console.log(`output->total`,total)
}


const fs = require('node:fs');

const samplePath = 'Day7CamelCards/sample.txt'
const fullPath = 'Day7CamelCards/full.txt' 

fs.readFile(fullPath, 'utf-8', (error, data) => {
	if (error) {
		console.log(`output->error`,error)
	}
	getWaysToRecord(data)
})

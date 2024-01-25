function getWaysToRecord(arg) {
	data = arg.split('\n')

	let map = {'T': 'A', 'J': '!', 'Q': 'C', 'K': 'D', 'A': 'E'}
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

	function getReplacements(hand) {
		if (hand == '') {
			return ['']
		}
		let items = []
		if (hand[0] == 'J') {
			for (let x of '23456789TQKA') {
				for (let y of getReplacements(hand.slice(1))) {
					items.push(x + y)
				}
			}
		} else {
			for (let y of getReplacements(hand.slice(1))) {
				items.push(hand[0] + y)
			}
		}
		return items;
	}

	function evaluateHand(hand) {
		let handMap = [];
		for (let char of hand) {
			handMap.push(map[char] || char)
		}

		let maxScore = Number.NEGATIVE_INFINITY
		let replacements = getReplacements(hand);
		for (let replacement of replacements) {
			const score = getHandScore(replacement);
			if (score > maxScore) {
				maxScore = score
			}
		}
		return [maxScore, handMap]
	}

	result.sort((a,b) => {
		let [typeA, cardA] = evaluateHand(a.combo);
		let [typeB, cardB] = evaluateHand(b.combo);
		if (typeA !== typeB) {
			return typeA - typeB
		} else {
			let joinedA = cardA.join('');
			let joinedB = cardB.join('')
			return joinedA.localeCompare(joinedB)
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

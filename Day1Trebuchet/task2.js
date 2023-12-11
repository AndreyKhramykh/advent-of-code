function getNumbers(data) { 
	let total = 0 
	const dict = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
	let array = data.split('\n');
	array.forEach(line => { 
		let nums = [] 
		for(let i = 0; i < line.length; i++){ 
	if(!isNaN(line.charAt(i))){ 
		nums.push(parseInt(line.charAt(i))) 
	} else { 
		 dict.forEach(num =>{ 
			if(line.slice(i).startsWith(num)){ nums.push(dict.indexOf(num)+1) } }) } } 
			total += nums[0] * 10 + nums[nums.length-1] 
		}) 
console.log(`output->total`,total)
} 

const fs = require('node:fs');

const samplePath = 'adventOfCode2023/Day1Trebuchet/sample.txt'
const fullPath = 'adventOfCode2023/Day1Trebuchet/full.txt' 
const partPath = 'adventOfCode2023/Day1Trebuchet/part.txt'

fs.readFile(fullPath, 'utf-8', (error, data) => {
	if (error) {
		console.log(`output->error`,error)
	}
	getNumbers(data)
})
'use strict'

const gen = async (a, b) => {

	const bufferSpace = 40;

	numrows = a // Math.floor((window.innerHeight - bufferSpace)/cellSize);
	numcols = b // Math.floor((window.innerWidth - bufferSpace)/cellSize);
	// console.log(numrows, numcols)
	// console.log(window.innerHeight, window.innerWidth)
	// const maze = 
	const maze = await randomPrims(numrows, numcols);
	await sleep(500)
	await searchBFS(maze, numrows, numcols);

}
// const c = 12;
gen(16,33);//16, 32);//44, 86);
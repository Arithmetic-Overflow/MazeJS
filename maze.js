'use strict'

const main = async (nrows, ncols) => {
	numrows = nrows;
	numcols = ncols;

	const maze = await randomPrims(numrows, numcols);
	await sleep(500)
	await searchBFS(maze, numrows, numcols);

}

main(37, 75);
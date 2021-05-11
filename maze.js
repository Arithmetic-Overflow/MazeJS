'use strict'

// TODO
// Implement A*
// Implement "follow the right wall"

const duplicateMaze = (numDuplicates) => {
	const mazeTable = document.getElementsByClassName("maze")[0];
	for(let i = 0; i < numDuplicates; i++) {
		// deepclone of the maze
		const mazeTableCopy = mazeTable.cloneNode([true]);
		document.body.appendChild(mazeTableCopy);
	}
}

const main = async (numTables, nrows, ncols) => {
	numrows = nrows;
	numcols = ncols;

	// generate the maze
	const maze = await randomPrims(numrows, numcols);

	duplicateMaze(numTables - 1);

	// animate DFS and BFS simultaneously
	searchDFS(maze, numrows, numcols, 0);
	searchBFS(maze, numrows, numcols, 1);
	searchAStar(maze, numrows, numcols, 2);
}

main(3, 12, 25);
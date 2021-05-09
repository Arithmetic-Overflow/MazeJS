'use strict'

// TODO
// Implement A*
// Implement "follow the right wall"

const main = async (numTables, nrows, ncols) => {
	numrows = nrows;
	numcols = ncols;

	// generate the maze
	const maze = await randomPrims(numrows, numcols);

	const mazeTable = document.getElementsByClassName("maze")[0];
	for(let i = 1; i < numTables; i++) {
		// deepclone of the maze
		const mazeTableCopy = mazeTable.cloneNode([true]);
		document.body.appendChild(mazeTableCopy);
	}

	// animate DFS and BFS simultaneously
	searchDFS(maze, numrows, numcols, 0);
	searchBFS(maze, numrows, numcols, 1);
}

main(4, 13, 30);
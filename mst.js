/* ------------------------------------------------ Generating a graph for the MST----------------------------------------------- */

// generate an empty 'maze', randomize the weights, then find the MST
// create a path through the maze based on the MST
const genRandomWeights = (nrows, ncols) => {
	return randomizeWeights(
		genEmptyMaze(nrows, ncols)
	);
}

// randomizes the weights between every connected cell
// the graph is undirected
// the east-weight of 1 cell is the west-weight of the next
// the south-weight of 1 cell is the north-weight of the next
const randomizeWeights = (maze) => {
	const randWeight = () => randRange(1, 200);

	for(let i = 0; i < numrows; i++) {
		for(let j = 0; j < numcols - 1; j++) {
			const w = randWeight();

			maze[i][j].eWeight 		= w;
			maze[i][j + 1].wWeight 	= w;
		}
	}

	for(let i = 0; i < numrows - 1; i++) {
		for(let j = 0; j < numcols; j++) {
			const w = randWeight();

			maze[i + 1][j].sWeight 	= w;
			maze[i][j].nWeight 		= w;
		}
	}

	return maze;
}

/* ------------------------------------------------------------------------------------------------------------------------------ */
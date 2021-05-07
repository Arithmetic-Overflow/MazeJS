/* ---------------------------------------- All the code that deals with generating the maze ------------------------------------ */

// generate an empty cell
// all borders exist, all weights are 'infinity'
const genMazeCell = () => {
	return {
		n : true,
		e : true,
		s : true,
		w : true,
		nWeight : 999999,
		eWeight : 999999,
		sWeight : 999999,
		wWeight : 999999
	}
}

// generates a maze that is nrows x ncols consisting of empty cells
const genEmptyMaze = (nrows, ncols) => {
	return (
		Array(nrows)
			.fill(0)
			.map(
				() => Array(ncols)
					.fill(0)
					.map(
						() => genMazeCell()
					)
			)
	);
}

/* ------------------------------------------------------------------------------------------------------------------------------ */
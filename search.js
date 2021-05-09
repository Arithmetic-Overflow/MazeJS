"use strict"

const colours = {
	visited		: "#bd28bd",
	visiting 	: "#3da4a8",
	solution	: "#0be00b"
};

const TERMINAL_NODE = -2;

const makeVertex = (i, j) => ({i: i, j: j});

// returns an nrows x ncols array with {i:-1, j:-1}
const initializeParents = (nrows, ncols) => {
	return 	(
		Array(nrows)
			.fill(0)
			.map(
				() => 	Array(ncols)
							.fill({i : -1, j : -1})
			)
	);
}

// retrieves a cell from the maze and sets it to the given colour
const setCellColour = (mazeIndex, row, column, colour) => {
	const mazeTable = document.getElementsByClassName("maze")[mazeIndex];
	mazeTable.children.item(row).children.item(column).style.backgroundColor = colour;
}

// draws the path from the end to the start of the maze by tracing the parents until the origin
const drawPath = async (mazeIndex, parents, nrows, ncols) => {
	let path = Array();
	let p = {i : nrows - 1, j : ncols - 1};
	while(p.i != TERMINAL_NODE && p.j != TERMINAL_NODE) {
		path.push(p);
		p = parents[p.i][p.j];
	}

	const mazeTable = document.getElementsByClassName("maze")[mazeIndex];
	for(let v of path) {
		setCellColour(mazeIndex, v.i, v.j, colours.solution);
		await sleep(5);
	}
}
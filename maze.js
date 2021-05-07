'use strict'

// import * from "./buckets.js"
// note to self: remove doubled edges

// constant declarations
const defaultBorderStyle = "2px solid #dedede";
let numrows = 5;
let numcols = 5;


/* ---------------------------------------- All the code dealing with generating the HTML --------------------------------------- */

// returns a visible border or none if not visible
const genBorderStyle = (gridCell, direction) => {
	return ((gridCell[direction]) ? defaultBorderStyle : "none");
}


// generates a cell with the specified style
const genCell = (gridCell) => {
	const tableCell = document.createElement("td");

	tableCell.style["borderTop"]	= genBorderStyle(gridCell, 'n');
	tableCell.style["borderRight"]	= genBorderStyle(gridCell, 'e');
	tableCell.style["borderBottom"]	= genBorderStyle(gridCell, 's');
	tableCell.style["borderLeft"]	= genBorderStyle(gridCell, 'w');

	// tableCell.style.width  = "35px";
	// tableCell.style.height = "35px";

	// tableCell.style.margin 	= "0";
	// tableCell.style.padding = "0";

	// tableCell.cellSpacing = "0";
	// tableCell.cellPadding = "0";

	tableCell.classList.add("maze-cell");

	return tableCell;
}


// generate a table row to append to the table
const genRow = (gridRow) => {
	const tableRow = document.createElement("tr");

	gridRow.map(
		(cell) => tableRow.appendChild(genCell(cell))
	);

	tableRow.classList.add("maze-row");

	return tableRow;
}

// generate the maze as an html table
const genMazeTable = (grid) => {
	const table = document.createElement("table");
	grid.map(
		(row) => table.appendChild(genRow(row))
	);

	table.classList.add("maze");

	return table;
}

/* ------------------------------------------------------------------------------------------------------------------------------ */



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


/* -------------------------------------------- The code for randomizing the edge weights --------------------------------------- */

// random value in [lower, upper)
const randRange = (lower, upper) => {
	return Math.floor(Math.random() * (upper - lower + 1) + lower);
}

// randomizes the weights between every connected cell
// the graph is undirected
// the east-weight of 1 cell is the west-weight of the next
// the south-weight of 1 cell is the north-weight of the next
const randomizeWeights = (maze) => {
	const randWeight = () => randRange(1, 200);

	for(let i = 0; i < numrows - 1; i++) {
		for(let j = 0; j < numcols; j++) {
			const w = randWeight();

			maze[i][j].eWeight 		= w;
			maze[i+1][j].wWeight 	= w;
		}
	}

	for(let i = 0; i < numrows; i++) {
		for(let j = 0; j < numcols - 1; j++) {
			const w = randWeight();

			maze[i][j].sWeight 		= w;
			maze[i][j+1].nWeight 	= w;
		}
	}

	return maze;
}

const applyPrimsToMaze = (maze) => {
	const pq = buckets.PriorityQueue(((x, y) => x.w - y.w));
	let included = 	Array(numrows)
						.fill(0)
						.map(
							() => Array(numcols)
									.fill(false)
						);

	// console.log(included);
	// console.log(maze);

	const inverseDirection = (direction) => {
		const dirMap = {
			n : "s",
			e : "w",
			s : "n",
			w : "e"
		};

		return dirMap[direction];
	}

	const isIncluded = (ind) => {
		const r = Math.floor(ind/numcols);
		const c = ind%numcols;

		// console.log(r, c);

		if(r < 0 || r >= numrows) {
			return true;
		}

		else if(c < 0 || c >= numcols) {
			return true;
		}

		return included[r][c];
	}

	// const mpq = buckets.PriorityQueue(((x, y) => x.w < y.w));
	// const start = maze[0][0];
	// mpq.add({w : start.nWeight, dir : "n", from : 0, to : numcols});
	// mpq.add({w : start.eWeight, dir : "e", from : 0, to : 1});
	// // mpq.add({w : start.sWeight, dir : "s", from : 0, to : 1});
	// // mpq.add({w : start.wWeight, dir : "w", from : 0, to : 1});

	// const first = mpq.dequeue();
	// pq.add(first);

	included[0][0] = true;
	maze[0][0].eWeight = 0;
	pq.add({from : 0, to : 1, dir : "e", w : 0});

	while(!pq.isEmpty()) {
		let vertex = pq.dequeue();

		if(isIncluded(vertex.to)) {
			continue;
		}

		const toRow		= Math.floor(vertex.to/numcols);
		const toCol		= vertex.to%numcols;

		const fromRow	= Math.floor(vertex.from/numcols);
		const fromCol	= vertex.from%numcols;

		if(fromRow == 0 && vertex.dir == "n") {
			continue;
		}

		if(fromCol == 0 && vertex.dir == "w") {
			continue;
		}

		if(fromRow == numrows - 1 && vertex.dir == "s") {
			continue;
		}

		if(fromCol == numcols - 1 && vertex.dir == "e") {
			continue;
		}

		const northbound = {
			to: 	vertex.to - numcols,
			from: 	vertex.to,
			dir: 	"n", 
			w: 		maze[toRow][toCol].nWeight
		}

		const eastbound = {
			to: 	vertex.to + 1,
			from: 	vertex.to,
			dir: 	"e", 
			w: 		maze[toRow][toCol].eWeight
		}

		const southbound = {
			to: 	vertex.to + numcols,
			from: 	vertex.to,
			dir: 	"s", 
			w: 		maze[toRow][toCol].sWeight
		}

		const westbound = {
			to: 	vertex.to - 1,
			from: 	vertex.to,
			dir: 	"w", 
			w: 		maze[toRow][toCol].wWeight
		}

		if(!isIncluded(northbound.to)) {
			pq.add(northbound);
		}

		if(!isIncluded(eastbound.to)) {
			pq.add(eastbound);
		}

		if(!isIncluded(southbound.to)) {
			pq.add(southbound);
		}

		if(!isIncluded(westbound.to)) {
			pq.add(westbound);
		}

		const invdir = inverseDirection(vertex.dir);

		maze[toRow][toCol][invdir] 	= false;
		maze[fromRow][fromCol][vertex.dir] 	= false;

		// console.log(fromRow, fromCol, vertex.dir);

		// const mazeTable = genMazeTable(maze);
		// document.body.appendChild(mazeTable);

		console.log(vertex.w);

		included[toRow][toCol] = true;
	}

	return maze;
}

// generate an empty 'maze', randomize the weights, then find the MST
// create a path through the maze based on the MST
const genRandomMaze = (nrows, ncols) => {
	return randomizeWeights(
		genEmptyMaze(nrows, ncols)
	);
}

const randomPrims = (nrows, ncols) => {
	const maze = genRandomMaze(nrows, ncols);
	maze[0][0].n = false;
	maze[numrows-1][numcols-1].s = false;

	return applyPrimsToMaze(maze);
}

/* ------------------------------------------------------------------------------------------------------------------------------ */






const gen = (a, b) => {
	numrows = a;
	numcols = b;
	const mazeGrid = randomPrims(numrows, numcols);//genEmptyMaze(numrows, numcols);


	// console.log(mazeGrid)

	const mazeTable = genMazeTable(mazeGrid);
	document.body.appendChild(mazeTable);
	console.log(mazeGrid);
}

gen(26, 51)
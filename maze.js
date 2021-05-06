'use strict'

// constant declarations
const defaultBorderStyle = "1px solid #dedede";
const numrows = 24;
const numcols = 48;


/* ---------------------------------------- All the code dealing with generating the HTML --------------------------------------- */

const genBorderStyle = (gridCell, direction) => {
	// return "thick solid #0000FF";
	return ((gridCell[direction]) ? defaultBorderStyle : "none");
}

const genCell = (gridCell) => {
	const tableCell = document.createElement("td");

	tableCell.style["borderTop"]	= genBorderStyle(gridCell, 'n');
	tableCell.style["borderRight"]	= genBorderStyle(gridCell, 'e');
	tableCell.style["borderBottom"]	= genBorderStyle(gridCell, 's');
	tableCell.style["borderLeft"]	= genBorderStyle(gridCell, 'w');

	tableCell.style.width  = "35px";
	tableCell.style.height = "35px";

	tableCell.style.margin 	= "0";
	tableCell.style.padding = "0";

	// tableCell.cellSpacing = "0";
	// tableCell.cellPadding = "0";

	tableCell.classList.add("maze-cell");

	return tableCell;
}


const genRow = (gridRow) => {
	const tableRow = document.createElement("tr");

	gridRow.map(
		(cell) => tableRow.appendChild(genCell(cell))
	);

	tableRow.classList.add("maze-row");

	return tableRow;
}

const genMazeTable = (grid) => {
	const table = document.createElement("table");
	grid.map(
		(row) => table.appendChild(genRow(row))
	);

	table.classList.add("maze");

	return table;
}

/* ------------------------------------------------------------------------------------------------------------------------------ */


/* ---------------------------------------- All the code that deals with generating the mazeL ----------------------------------- */

const genMazeCell = () => {
	return {
		n : true,
		e : true,
		s : true,
		w : true
	}
}

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

const mazeGrid = genEmptyMaze(numrows, numcols);

console.log(mazeGrid)

const mazeTable = genMazeTable(mazeGrid);
console.log(mazeTable);
document.body.appendChild(mazeTable);

/* ------------------------------------------------------------------------------------------------------------------------------ */
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

// updates a cell in the table
const updateCell = (mazeTable, cell, row, col) => {
	const tableRow	= mazeTable.children.item(row);

	tableRow.insertBefore(cell, tableRow.children.item(col));
	tableRow.removeChild(tableRow.children.item(col+1));

}

/* ------------------------------------------------------------------------------------------------------------------------------ */
"use strict"

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

const searchBFS = async (grid, nrows, ncols) => {
	let parents = initializeParents(nrows, ncols);

	const makeVertex = (i, j) => ({i: i, j: j});

	const bfs = async (parent, vertex, parents) => {
		// console.log(parent, vertex)
		if(vertex.i < 0 || vertex.i >= nrows) {
			return false;
		}

		if(vertex.j < 0 || vertex.j >= ncols) {
			return false;
		}

		console.log("parents", parents)
		const parentOfVertex = parents[vertex.i][vertex.j];
		// console.log("?", parentOfVertex);

		if(parentOfVertex.i != -1 && parentOfVertex.j != -1) {
			return false;
		}

		const mazeTable = document.getElementsByClassName("maze")[0];
		mazeTable.children.item(vertex.i).children.item(vertex.j).style.backgroundColor = "#2222dd";

		await sleep(20);

		// only search unvisited cells
		parents[vertex.i][vertex.j] = parent;
		if(vertex.i == nrows - 1 && vertex.j == ncols - 1) {
			return true;
		}

		// the cell represented by the vertex coordinates
		const gridCell = grid[vertex.i][vertex.j];

		// search neighbouring cells: if the end is found stop searching
		let pathFound = false;

		if(gridCell.e == false) {
			pathFound = await bfs(vertex, makeVertex(vertex.i, vertex.j + 1), parents);
			if(pathFound) {
				return true;
			}
		}

		if(gridCell.w == false) {
			pathFound = await bfs(vertex, makeVertex(vertex.i, vertex.j - 1), parents);
			if(pathFound) {
				return true;
			}
		}

		if(gridCell.s == false) {
			pathFound = await bfs(vertex, makeVertex(vertex.i + 1, vertex.j), parents);
			if(pathFound) {
				return true;
			}
		}

		if(gridCell.n == false) {
			pathFound = await bfs(vertex, makeVertex(vertex.i - 1, vertex.j), parents);
			if(pathFound) {
				return true;
			}
		}
	}

	await bfs({i : -2, j : -2}, {i : 0, j : 0}, parents);

	let path = Array();
	let p = {i : nrows - 1, j : ncols - 1};
	while(p.i != -2 && p.j != -2) {
		path.push(p);
		p = parents[p.i][p.j];
	}

	// path.reverse();
	console.log("path", path);
	// console.log(grid);
	console.log("parents", parents);

	for(let v of path) {
		const mazeTable = document.getElementsByClassName("maze")[0];
		mazeTable.children.item(v.i).children.item(v.j).style.backgroundColor = "#22dd22";
		await sleep(5);
	}
}
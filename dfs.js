// performs a BFS search: draws the progress and the solution
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
		const parentOfVertex = parents[vertex.i][vertex.j];

		if(parentOfVertex.i != -1 && parentOfVertex.j != -1) {
			return false;
		}

		setCellColour(vertex.i, vertex.j, colours.visiting);

		await sleep(15);

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

		setCellColour(vertex.i, vertex.j, colours.visited);
	}

	// Start the BFS from the terminal node going into the initial node
	await bfs({i : TERMINAL_NODE, j : TERMINAL_NODE}, {i : 0, j : 0}, parents);
	await drawPath(parents, nrows, ncols);
}
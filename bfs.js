"use strict"

const searchBFS = async (grid, nrows, ncols, mazeIndex) => {
	let parents = initializeParents(nrows, ncols);

	let queue = Array();
	queue.push({
		parent 		: {i : TERMINAL_NODE, j : TERMINAL_NODE},
		vertex 		: {i : 0, j : 0},
		distance 	: 0
		}
	);

	// for colouring purposes
	let currentDist 	= -1;
	let found 			= false;
	let nodesVisiting 	= Array();
	let nodesVisited 	= Array();

	while(queue.length > 0) {
		let vertexInfo = queue.shift();

		let parent 		= vertexInfo.parent;
		let vertex 		= vertexInfo.vertex;
		let distance 	= vertexInfo.distance;

		// at every distance colour the grid
		if(distance > currentDist) {
			currentDist = distance;

			// colour all the new nodes the visitng colour
			for(let v of nodesVisiting) {
				setCellColour(mazeIndex, v.i, v.j, colours.visiting);
			}

			// colour the old nodes the visited colour
			for(let v of nodesVisited) {
				setCellColour(mazeIndex, v.i, v.j, colours.visited);
			}

			nodesVisited 	= nodesVisiting;
			nodesVisiting 	= Array();

			await sleep(50);

			// stop at the distance threshold when a solution is found
			// still finish the iteration as to draw the search correctly though
			if(found) {

				// colour all the nodes as visited at the end
				for(let v of nodesVisited) {
					setCellColour(mazeIndex, v.i, v.j, colours.visited);
				}

				break;
			}
		}
		
		// skips vertices outside the graph
		if(vertex.i < 0 || vertex.i >= nrows) {
			continue;
		}

		if(vertex.j < 0 || vertex.j >= ncols) {
			continue;
		}

		// skip visited vertices
		const parentOfVertex = parents[vertex.i][vertex.j];
		if(parentOfVertex.i != -1 && parentOfVertex.j != -1) {
			continue;
		}

		if(vertex.i == nrows - 1 && vertex.j == ncols - 1) {
			found = true;
		}

		nodesVisiting.push(vertex);

		parents[vertex.i][vertex.j] = parent;

		const gridCell = grid[vertex.i][vertex.j];
		if(gridCell.e == false) {
			queue.push({
				parent 		: {i : vertex.i, j : vertex.j},
				vertex 		: {i : vertex.i, j : vertex.j + 1},
				distance 	: distance + 1
				}
			);
		}

		if(gridCell.w == false) {
			queue.push({
				parent 		: {i : vertex.i, j : vertex.j},
				vertex 		: {i : vertex.i, j : vertex.j - 1},
				distance 	: distance + 1
				}
			);
		}

		if(gridCell.s == false) {
			queue.push({
				parent 		: {i : vertex.i, j : vertex.j},
				vertex 		: {i : vertex.i + 1, j : vertex.j},
				distance 	: distance + 1
				}
			);
		}

		if(gridCell.n == false) {
			queue.push({
				parent 		: {i : vertex.i, j : vertex.j},
				vertex 		: {i : vertex.i - 1, j : vertex.j},
				distance 	: distance + 1
				}
			);
		}
	}

	await drawPath(mazeIndex, parents, nrows, ncols);
}
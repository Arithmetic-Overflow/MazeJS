"use strict"

// distance under the manhattan metric
const manhattan = (i1, j1, i2, j2) => Math.abs(i1 - i2) + Math.abs(j2 - j2);

// heuristic function
const hCost = (i, j, nrows, ncols) => manhattan(i, j, nrows, ncols);

// returns cost estimate of the path
const fCost = (i, j, gCost, nrows, ncols) => {
	return hCost(i, j, nrows, ncols) + gCost;
}

const vertexFCost = (vertex, nrows, ncols) => fCost(vertex.i, vertex.j, vertex.distance, nrows, ncols);

const initializeFCosts = (nrows, ncols) => {
	return 	(
		Array(nrows)
			.fill(0)
			.map(
				() => 	Array(ncols)
							.fill(-1)
			)
	);
}

const vertexInGrid = (vertex, nrows, ncols) => {
	if(vertex.i < 0 || vertex.i >= nrows) {
		return false;
	}

	if(vertex.j < 0 || vertex.j >= ncols) {
		return false;
	}

	return true;
}

// performs a BFS search: draws the progress and the solution
const searchAStar = async (grid, nrows, ncols, mazeIndex) => {
	const pq = buckets.PriorityQueue(
		(x, y) => 
			fCost(y.vertex.i, y.vertex.j, y.distance, nrows, ncols) - fCost(x.vertex.i, x.vertex.j, x.distance, nrows, ncols)
	);

	let parents = initializeParents(nrows, ncols);
	let fCosts = initializeFCosts(nrows, ncols);

	pq.add({
		parent 		: {i : TERMINAL_NODE, j : TERMINAL_NODE},
		vertex 		: {i : 0, j : 0},
		distance 	: 0,
		fCost 		: hCost(0, 0, 0, nrows, ncols)
		}
	);

	while(!pq.isEmpty()) {
		let vertexInfo = pq.dequeue();

		let parent 		= vertexInfo.parent;
		let vertex 		= vertexInfo.vertex;
		let distance 	= vertexInfo.distance;	// this is the gCost
		let pathCost	= vertexInfo.fCost;		// this is the fCost

		// console.log("d", distance);


		// console.log(vertex.i, vertex.j, pathCost);

		// skips vertices outside the graph
		if(vertex.i < 0 || vertex.i >= nrows) {
			continue;
		}

		if(vertex.j < 0 || vertex.j >= ncols) {
			continue;
		}

		// skips suboptimal paths
		if(pathCost >= fCosts[vertex.i][vertex.j] && fCosts[vertex.i][vertex.j] != -1) {
			continue;
		}
		

		// console.log(vertexFCost(vertexInfo.vertex, nrows, ncols))
		fCosts[vertex.i][vertex.j] = pathCost;


		setCellColour(mazeIndex, vertex.i, vertex.j, colours.visited);
		// setCellColour(mazeIndex, v.i, v.j, colours.visiting);

		// only sets the parent to the parent in the optimal path
		parents[vertex.i][vertex.j] = parent;

		drawPath(mazeIndex, parents, vertex.i+1, vertex.j+1, colours.visiting, 0);

		// exit condition: found the optimal path
		if(vertex.i == nrows - 1 && vertex.j == ncols - 1) {
			break
		}

		await sleep(8);

		let newV;
		let newFCost;

		const gridCell = grid[vertex.i][vertex.j];
		if(gridCell.e == false) {
			newV = {i : vertex.i, j : vertex.j + 1};
			newFCost = fCost(vertex.i, vertex.j + 1, distance + 1, nrows, ncols);
			if(vertexInGrid(newV, nrows, ncols) && (newFCost < fCosts[newV.i][newV.j] || fCosts[newV.i][newV.j] == -1)) {
				pq.add({
					parent 		: {i : vertex.i, j : vertex.j},
					vertex 		: newV,
					distance 	: distance + 1,
					fCost 		: newFCost
					}
				);
			}
		}

		if(gridCell.w == false) {
			newV = {i : vertex.i, j : vertex.j - 1};
			newFCost = fCost(vertex.i, vertex.j - 1, distance + 1, nrows, ncols);
			if(vertexInGrid(newV, nrows, ncols) && (newFCost < fCosts[newV.i][newV.j] || fCosts[newV.i][newV.j] == -1)) {
				pq.add({
					parent 		: {i : vertex.i, j : vertex.j},
					vertex 		: newV,
					distance 	: distance + 1,
					fCost 		: newFCost
					}
				);
			}
		}

		if(gridCell.s == false) {
			newV = {i : vertex.i + 1, j : vertex.j};
			newFCost = fCost(vertex.i + 1, vertex.j, distance + 1, nrows, ncols);
			if(vertexInGrid(newV, nrows, ncols) && (newFCost < fCosts[newV.i][newV.j] || fCosts[newV.i][newV.j] == -1)) {
				pq.add({
					parent 		: {i : vertex.i, j : vertex.j},
					vertex 		: newV,
					distance 	: distance + 1,
					fCost 		: newFCost
					}
				);
			}
		}

		if(gridCell.n == false) {
			newV = {i : vertex.i - 1, j : vertex.j};
			newFCost = fCost(vertex.i - 1, vertex.j, distance + 1, nrows, ncols);
			if(vertexInGrid(newV, nrows, ncols) && (newFCost < fCosts[newV.i][newV.j] || fCosts[newV.i][newV.j] == -1)) {
				pq.add({
					parent 		: {i : vertex.i, j : vertex.j},
					vertex 		: newV,
					distance 	: distance + 1,
					fCost 		: newFCost
					}
				);
			}
		}

		drawPath(mazeIndex, parents, vertex.i+1, vertex.j+1, colours.visited, 0);
	}

	await drawPath(mazeIndex, parents, nrows, ncols);
}
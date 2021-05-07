/* ------------------------------------------------ Running Prim's algorithm ----------------------------------------------- */

// removes walls to make a path along the MST of the maze using prim's algorithm
const applyPrimsToMaze = async (maze) => {
	const pq = buckets.PriorityQueue(((x, y) => x.w - y.w));
	let included = 	Array(numrows)
						.fill(0)
						.map(
							() => Array(numcols)
									.fill(false)
						);

	const mazeTable = document.getElementsByClassName("maze")[0];

	// a mapping to find the opposite direction
	const inverseDirection = (direction) => {
		const dirMap = {
			n : "s",
			e : "w",
			s : "n",
			w : "e"
		};

		return dirMap[direction];
	}

	// returns whether a vertex is in the MST already
	const isIncluded = (ind) => {
		const r = Math.floor(ind/numcols);
		const c = ind%numcols;

		if(r < 0 || r >= numrows) {
			return true;
		}

		else if(c < 0 || c >= numcols) {
			return true;
		}

		return included[r][c];
	}

	// add the edges from the top left to the graph
	pq.add(
		{
			from : 0,
			to : 1,
			dir : "e",
			w : maze[0][0].eWeight
		}
	);
	pq.add(
		{
			from : 0,
			to : numcols,
			dir : "s",
			w : maze[0][0].sWeight
		}
	);

	// Prim's algorithm
	while(!pq.isEmpty()) {
		let vertex = pq.dequeue();

		// if the vertex has been added to the tree since the edge was put in the pq then skip it
		if(isIncluded(vertex.to)) {
			continue;
		}

		// rows/columns of the vertices in the edge
		const toRow		= Math.floor(vertex.to/numcols);
		const toCol		= vertex.to%numcols;

		const fromRow	= Math.floor(vertex.from/numcols);
		const fromCol	= vertex.from%numcols;

		// if the edge is invalid (goes off the grid) then ignore it
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

		// generates the four possible edges
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

		// add the edges if they are not already going to a vertex in the graph
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

		// remove the walls in accordance with the MST
		const invdir = inverseDirection(vertex.dir);

		maze[toRow][toCol][invdir]			= false;
		maze[fromRow][fromCol][vertex.dir]	= false;

		// remove the newly deleted walls
		updateCell(mazeTable, genCell(maze[toRow][toCol]), toRow, toCol);
		updateCell(mazeTable, genCell(maze[fromRow][fromCol]), fromRow, fromCol);

		await sleep(timeoutInterval)

		// mark the new vertex as part of the MST
		included[toRow][toCol] = true;
	}

	return maze;
}

// generates a maze and then applies prims
const randomPrims = (nrows, ncols) => {
	const maze = genRandomWeights(nrows, ncols);
	maze[0][0].n = false;
	maze[numrows-1][numcols-1].s = false;

	document.body.insertBefore(genMazeTable(maze), document.body.firstChild);

	return applyPrimsToMaze(maze);
}

/* ------------------------------------------------------------------------------------------------------------------------------ */

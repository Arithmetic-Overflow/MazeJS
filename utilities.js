/* -------------------------------------------------- Basic Utility Functions --------------------------------------------------- */

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// random value in [lower, upper)
const randRange = (lower, upper) => {
	return Math.floor(Math.random() * (upper - lower + 1) + lower);
}

/* ------------------------------------------------------------------------------------------------------------------------------ */
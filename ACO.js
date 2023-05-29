function ACO(cities, numAnts, numIterations, alpha, beta, evaporationRate) {
	const numCities = cities.length;
	const pheromoneMatrix = initializePheromoneMatrix(numCities);
	let bestTour;
	let bestDistance = Number.MAX_VALUE;

	// Main loop for iterations
	for (let iteration = 0; iteration < numIterations; iteration++) {
		const antTours = [];

		// Construct tours for each ant
		for (let ant = 0; ant < numAnts; ant++) {
			const tour = constructTour(pheromoneMatrix, cities, alpha, beta);
			antTours.push(tour);

			// Update the best tour if a shorter tour is found
			const tourDistance = getTotalDistance(tour, cities);
			if (tourDistance < bestDistance) {
				bestTour = tour;
				bestDistance = tourDistance;
			}
		}

		// Update pheromone matrix based on ant tours
		updatePheromoneMatrix(pheromoneMatrix, antTours, evaporationRate);
	}

	return bestTour;
}

function initializePheromoneMatrix(numCities) {
	const initialPheromone = 1 / numCities;
	const pheromoneMatrix = Array.from({ length: numCities }, () => Array.from({ length: numCities }, () => initialPheromone));

	return pheromoneMatrix;
}

function constructTour(pheromoneMatrix, cities, alpha, beta) {
	const numCities = cities.length;
	const tour = [];
	const visitedCities = new Set();
	let currentCity = Math.floor(Math.random() * numCities);

	tour.push(currentCity);
	visitedCities.add(currentCity);

	// Build the tour by selecting the next city
	while (visitedCities.size < numCities) {
		const probabilities = calculateProbabilities(currentCity, visitedCities, pheromoneMatrix, cities, alpha, beta);
		const nextCity = selectNextCity(probabilities);
		tour.push(nextCity);
		visitedCities.add(nextCity);
		currentCity = nextCity;
	}

	return tour;
}

function calculateProbabilities(currentCity, visitedCities, pheromoneMatrix, cities, alpha, beta) {
	const probabilities = [];
	let denominator = 0;

	// Calculate the probabilities for unvisited cities
	for (let city = 0; city < cities.length; city++) {
		if (!visitedCities.has(city)) {
			const pheromone = pheromoneMatrix[currentCity][city];
			const distance = getDistance(cities[currentCity], cities[city]);
			const attractiveness = 1 / distance;
			const probability = Math.pow(pheromone, alpha) * Math.pow(attractiveness, beta);
			probabilities[city] = probability;
			denominator += probability;
		}
	}

	// Normalize the probabilities
	return probabilities.map((p) => p / denominator);
}

function selectNextCity(probabilities) {
	const random = Math.random();
	let cumulativeProbability = 0;

	// Select the next city based on probabilities
	for (let city = 0; city < probabilities.length; city++) {
		cumulativeProbability += probabilities[city];
		if (random <= cumulativeProbability) {
			return city;
		}
	}

	// Fallback if probabilities do not sum up to 1 due to precision issues
	return probabilities.length - 1;
}

function updatePheromoneMatrix(pheromoneMatrix, antTours, evaporationRate) {
	// Evaporate pheromone on all edges
	for (let i = 0; i < pheromoneMatrix.length; i++) {
		for (let j = 0; j < pheromoneMatrix[i].length; j++) {
			pheromoneMatrix[i][j] *= 1 - evaporationRate;
		}
	}

	// Deposit pheromone on edges visited by the ants
	for (const tour of antTours) {
		const tourDistance = getTotalDistance(tour, cities);
		const pheromoneDeposit = 1 / tourDistance;

		for (let i = 0; i < tour.length - 1; i++) {
			const cityA = tour[i];
			const cityB = tour[i + 1];
			pheromoneMatrix[cityA][cityB] += pheromoneDeposit;
			pheromoneMatrix[cityB][cityA] += pheromoneDeposit;
		}
	}
}

function getTotalDistance(tour, cities) {
	let totalDistance = 0;
	for (let i = 0; i < tour.length - 1; i++) {
		const cityA = cities[tour[i]];
		const cityB = cities[tour[i + 1]];
		const distance = getDistance(cityA, cityB);
		totalDistance += distance;
	}
	const firstCity = cities[tour[0]];
	const lastCity = cities[tour[tour.length - 1]];
	totalDistance += getDistance(lastCity, firstCity);
	return parseFloat(totalDistance.toFixed(3));
}

function getDistance(city1, city2) {
	const dx = city1.x - city2.x;
	const dy = city1.y - city2.y;
	return Math.sqrt(dx * dx + dy * dy);
}

// Example usage
const cities = [
	{ x: 60, y: 200 },
	{ x: 180, y: 200 },
	{ x: 80, y: 180 },
	{ x: 140, y: 180 },
	{ x: 20, y: 160 },
	{ x: 100, y: 160 },
	{ x: 200, y: 160 },
	{ x: 140, y: 140 },
	{ x: 40, y: 120 },
	{ x: 100, y: 120 },
	{ x: 180, y: 100 },
	{ x: 60, y: 80 },
	{ x: 120, y: 80 },
	{ x: 180, y: 60 },
	{ x: 20, y: 40 },
	{ x: 100, y: 40 },
	{ x: 200, y: 40 },
	{ x: 20, y: 20 },
	{ x: 60, y: 20 },
	{ x: 160, y: 20 },
];
const numAnts = 50;
const numIterations = 3000;
const alpha = 1;
const beta = 2;
const evaporationRate = 0.1;

const bestTour = ACO(cities, numAnts, numIterations, alpha, beta, evaporationRate);
const bestDistance = getTotalDistance(bestTour, cities);

console.log("Best Tour:", bestTour.map((idx) => idx + 1).join(" -> "));
console.log("Best Distance:", bestDistance);

/**
 * In the code above, we first define the ACO function, which takes the cities array, the number of ants, the number of iterations, the alpha and beta parameters, and the evaporation rate. Inside this function, we initialize the pheromone matrix, perform the main iterations of the algorithm, and return the best tour found.

The initializePheromoneMatrix function initializes the pheromone matrix with an initial pheromone value. The constructTour function constructs a tour for a single ant by selecting the next city based on pheromone levels and the alpha and beta parameters. The calculateProbabilities function calculates the probabilities of selecting each unvisited city based on pheromone levels and the attractiveness heuristic. The selectNextCity function selects the next city based on the calculated probabilities.

The updatePheromoneMatrix function updates the pheromone matrix based on the quality of the ant tours and the evaporation rate. It evaporates the pheromone on all edges and deposits pheromone on edges visited by the ants.

Finally, we provide an example usage of the algorithm with a set of cities. The best tour found by the algorithm and its corresponding distance are printed to the console.


 */

function simulatedAnnealing(cities, temperature, coolingRate) {
	const numCities = cities.length;
	let currentTour = createRandomTour(numCities);
	let bestTour = [...currentTour];

	while (temperature > 1) {
		const newTour = createNeighborTour(currentTour);
		const currentDistance = getTotalDistance(currentTour, cities);
		const newDistance = getTotalDistance(newTour, cities);

		if (acceptNewTour(currentDistance, newDistance, temperature)) {
			currentTour = [...newTour];
			if (newDistance < getTotalDistance(bestTour, cities)) {
				bestTour = [...newTour];
			}
		}

		temperature *= coolingRate;
	}

	return bestTour;
}

function createRandomTour(numCities) {
	const tour = [];
	for (let i = 0; i < numCities; i++) {
		tour.push(i);
	}
	shuffleArray(tour);
	return tour;
}

function createNeighborTour(tour) {
	const newTour = [...tour];
	const indexA = getRandomIndex(tour.length);
	let indexB = getRandomIndex(tour.length);
	while (indexB === indexA) {
		indexB = getRandomIndex(tour.length);
	}
	swap(newTour, indexA, indexB);
	return newTour;
}

function acceptNewTour(currentDistance, newDistance, temperature) {
	if (newDistance < currentDistance) {
		return true;
	}
	const acceptanceProbability = Math.exp(-(newDistance - currentDistance) / temperature);
	const randomProbability = Math.random();
	return randomProbability < acceptanceProbability;
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

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		swap(array, i, j);
	}
}

function swap(array, i, j) {
	//Swap cities at positions i and j with each other
	const temp = array[i];
	array[i] = array[j];
	array[j] = temp;
}

function getRandomIndex(max) {
	return Math.floor(Math.random() * max);
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

const temperature = 100;
const coolingRate = 0.99;

const bestTour = simulatedAnnealing(cities, temperature, coolingRate);
console.log("Best Tour: ", bestTour.map((idx) => idx + 1).join(" -> "));
console.log("Tour Cost (distance):", getTotalDistance(bestTour, cities));

// let costs = [];
// for (let index = 0.7; index < 1; index = index + 0.001) {
// 	let tour = simulatedAnnealing(cities, temperature, index);
// 	costs.push(getTotalDistance(tour, cities));
// }

// console.log("costs:", costs);

/**
 * In this implementation, the simulatedAnnealing function takes in an array of cities, the initial temperature,
 * and the cooling rate as input parameters. It iteratively performs the Simulated Annealing algorithm to find the best
 * tour for the TSP. The createRandomTour function generates a random initial tour, and the createNeighborTour function
 * creates a neighboring tour by swapping two cities. The acceptNewTour function determines whether to accept the new tour
 * based on the current temperature and the difference in distances. The getTotalDistance function calculates the total distance
 *  of a tour, and the getDistance function computes the Euclidean distance between two cities. The shuffleArray, swap,
 * and getRandomIndex functions are utility functions used in the algorithm.
 */

/**
 * EXPLANATION
 * Certainly! Let's delve into the Simulated Annealing algorithm solution for the Traveling Salesman Problem (TSP) in more detail:

The Simulated Annealing algorithm is a metaheuristic optimization algorithm inspired by the annealing process in metallurgy. It aims to find a good solution by simulating the cooling of a material. In the context of TSP, the algorithm iteratively explores the search space and gradually decreases the "temperature" parameter to control the acceptance of worse solutions.

Here's a step-by-step breakdown of the Simulated Annealing algorithm solution:

Initialize variables:

numCities: Number of cities in the problem.
temperature: The initial temperature value.
coolingRate: The rate at which the temperature is reduced.
Generate an initial random tour:

Use the createRandomTour function to generate a random tour as the initial solution. This function shuffles the indices of the cities to create a random tour.
Perform the main Simulated Annealing loop:

While the temperature is above a certain threshold (e.g., 1):
Create a new neighboring tour by using the createNeighborTour function. This function swaps two cities in the current tour to create a neighboring tour.
Calculate the distances of the current tour and the new tour using the getTotalDistance function.
Check if the new tour is better (i.e., has a shorter total distance) than the current tour:
If so, accept the new tour as the current tour.
If not, calculate an acceptance probability based on the temperature and the difference in distances using the acceptNewTour function. With a certain probability, the new tour may still be accepted even if it is worse than the current tour.
Update the best tour if the new tour is better than the current best tour.
Reduce the temperature by multiplying it with the cooling rate.
Return the best tour found.

The getTotalDistance function calculates the total distance of a tour by summing the distances between consecutive cities. It considers the distance between the last city and the first city as well, as it's a circular tour.

The createNeighborTour function generates a neighboring tour by randomly selecting two cities in the current tour and swapping their positions.

The acceptNewTour function determines whether to accept a new tour based on the temperature, the difference in distances between the current and new tours, and a random acceptance probability. As the temperature decreases, the acceptance probability decreases, making it less likely to accept worse solutions.

Please note that the success of the Simulated Annealing algorithm depends on parameter tuning, such as the initial temperature and cooling rate. Experimenting with different values and finding a good balance is essential.

To use the algorithm, provide the cities array containing the coordinates of the cities, along with the initial temperature and cooling rate. The algorithm will output the best tour found by the Simulated Annealing algorithm and the total distance of the tour.
 */

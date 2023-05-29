function Greedy(cities) {
	const numCities = cities.length;
	const visited = new Array(numCities).fill(false);
	visited[0] = true;
	const tour = [0];
	let currentCity = 0;

	for (let i = 0; i < numCities - 1; i++) {
		let nearestCity = null;
		let shortestDistance = Number.MAX_VALUE;

		for (let j = 0; j < numCities; j++) {
			if (!visited[j]) {
				const distance = getDistance(cities[currentCity], cities[j]);
				if (distance < shortestDistance) {
					nearestCity = j;
					shortestDistance = distance;
				}
			}
		}

		visited[nearestCity] = true;
		tour.push(nearestCity);
		currentCity = nearestCity;
	}

	return tour;
}

function getDistance(city1, city2) {
	const dx = city1.x - city2.x;
	const dy = city1.y - city2.y;
	return Math.sqrt(dx * dx + dy * dy);
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

const bestTour = Greedy(cities);
console.log("Best Tour: ", bestTour.map((idx) => idx + 1).join(" -> "));
console.log("Tour Cost (distance):", getTotalDistance(bestTour, cities));

/**
 * In this implementation, the Greedy function takes in an array of cities as input and returns the tour found by the Greedy algorithm. The algorithm starts from the first city and repeatedly selects the nearest unvisited city until all cities have been visited, forming the tour. The getDistance function calculates the Euclidean distance between two cities.

To use the algorithm, provide the cities array containing the coordinates of the cities. The algorithm will output the tour found by the Greedy algorithm and the total distance of the tour. Note that the Greedy algorithm may not always find the optimal solution for the TSP, but it provides a relatively good and efficient solution.
 */

/**
 * EXPLANATION:
 * Let's go through the Greedy algorithm solution for the Traveling Salesman Problem (TSP) in more detail.

The Greedy algorithm follows a simple and intuitive approach. It starts from an arbitrary city, in this case, the first city in the list of cities, and gradually builds the tour by selecting the nearest unvisited city at each step. The algorithm continues this process until all cities have been visited, forming a complete tour.

Here's a step-by-step breakdown of the algorithm:

Initialize variables:

numCities: Number of cities in the problem.
visited: An array to keep track of visited cities. Initially, all cities are marked as unvisited.
tour: An array to store the tour. It starts with the first city.
Mark the first city as visited:

Set visited[0] to true, indicating that the first city has been visited.
Iterate through the remaining cities:

For each iteration, find the nearest unvisited city from the current city.
Initialize nearestCity and shortestDistance variables to track the nearest city and its distance from the current city.
Iterate over all cities.
If the current city is not visited:
Calculate the distance between the current city and the unvisited city using the getDistance function.
If the distance is shorter than the current shortest distance, update nearestCity and shortestDistance.
Mark nearestCity as visited by setting visited[nearestCity] to true.
Add nearestCity to the tour array.
Set currentCity to nearestCity.
Return the tour:

The tour array will contain the cities in the order they were visited, forming a complete tour.
The getDistance function calculates the Euclidean distance between two cities using their coordinates. It uses the distance formula: distance = sqrt((x2 - x1)^2 + (y2 - y1)^2), where (x1, y1) and (x2, y2) are the coordinates of the two cities.

Finally, you can provide the cities array containing the coordinates of the cities, and the algorithm will output the tour found by the Greedy algorithm and the total distance of the tour calculated using the getTotalDistance function.

It's important to note that the Greedy algorithm does not guarantee an optimal solution for the TSP. It tends to find relatively good solutions but may fall short of the global optimum. The time complexity of the Greedy algorithm is O(n^2), where n is the number of cities, as it iterates through the cities for each city selection.
 */

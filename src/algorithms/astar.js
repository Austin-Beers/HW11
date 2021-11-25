import { manhattanDistance } from "../Util/Util";
const astar = (grid, startNode, finishNode) => {

  const visitedNodesInOrder = [];
  startNode.g = 0;
	startNode.f = 0;
  const unvisitedNodes = getNodes(grid);

  while (!!unvisitedNodes.length) {


		const closestNode = getClosestNode(unvisitedNodes)

    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a f of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.g === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    neighborUpdate(closestNode, grid, finishNode, true);
  }
}


const neighborUpdate = (node, grid, finishNode) =>  {

  const unvisitedNeighbors = getNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
		updateNode(node, neighbor, finishNode)
  }
}

const getClosestNode = (unvisitedNodes) => {
  let currentClosest, index;
  for (let i = 0; i < unvisitedNodes.length; i++) {
    if (!currentClosest || currentClosest.f > unvisitedNodes[i].f) {
      currentClosest = unvisitedNodes[i];
      index = i;
    } else if (currentClosest.totalDistance === unvisitedNodes[i].f) {
      if (currentClosest.h > unvisitedNodes[i].h) {
        currentClosest = unvisitedNodes[i];
        index = i;
      }
    }
  }
  unvisitedNodes.splice(index, 1);
  return currentClosest;
}

const updateNode = (currentNode, targetNode, finishNode) => {
	let distance = manhattanDistance(currentNode, targetNode);
	if (!targetNode.h) targetNode.h = manhattanDistance(targetNode, finishNode);
	let newDistance = currentNode.g + 1 + distance;
	if (newDistance < targetNode.g) {
		targetNode.g = newDistance;
		targetNode.f = targetNode.g + targetNode.h;
		targetNode.previousNode = currentNode;
	}
}

const getNeighbors = (node, grid) => {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

const getNodes = (grid) =>  {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}


export default astar;
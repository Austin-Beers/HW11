const dijkstra = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = [];
  startNode.g = 0;
  const unvisitedNodes = getNodes(grid);

  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
 

    if (closestNode.isWall) continue;

    if (closestNode.g === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    neighborUpdate(closestNode, grid, finishNode, false);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.g - nodeB.g);
}

function neighborUpdate(node, grid) {
  const unvisitedNeighbors = getNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.g = node.g + 1;
    neighbor.previousNode = node;
  }
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

export default dijkstra


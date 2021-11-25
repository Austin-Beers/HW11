
// Gets distance for h representation
export const manhattanDistance = (a, b) =>  {
	return Math.abs(a.row - b.row) + Math.abs(a.col - b.col)
}

// Finds Shortest Path based on finish Node
export const shortestPath = (finishNode) => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
  



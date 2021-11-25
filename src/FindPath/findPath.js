import React, {useEffect, useState} from 'react';
import { Button, ButtonGroup, Paper, Box } from '@material-ui/core';
import Spot from './Spot/Spot.js';
import dijkstra from '../algorithms/dijkstra.js';
import astar from '../algorithms/astar.js';
import './findPath.css';
import { shortestPath } from '../Util/Util.js';

const ROWS = 11;
const COLS = 11;
const START_NODE_ROW = 10;
const START_NODE_COL = 0;
const FINISH_NODE_ROW = 0;
const FINISH_NODE_COL = 10;
const IS_WALL = [
  [9, 2], 
  [9, 3], 
  [8, 3], 
  [8, 4], 
  [8, 5], 
  [7, 5], 
  [7, 6], 
  [7, 7], 
  [6, 7], 
  [6, 8]
]

const FindPath = ()  => {
  const [gridState, setGridState] = useState({grid: []})

useEffect(() => {
  const grid = getInitialGrid();
  setGridState({grid})
}, [])


  const animate = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 20 * i);
        return;
      } else { 
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
        }, 20 * i);
      }
    }
  }

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  const visualizeDijkstra = () =>  {
    const {grid} = gridState;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = shortestPath(finishNode);

    animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  const visualizeAstar = () =>  {
    const {grid} = gridState;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = shortestPath(finishNode);

    animate(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  const resetBoard = () => {
    window.location.reload(false);
  }
  

    return (
      <>
      <Box
        sx={{
          mt: '75px',
          justifyContent: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 450,
            height: 600,
          },
        }}
      >
        <Paper elevation={3}>
          <Box sx={{mt: '25px'}}>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button onClick={visualizeDijkstra}>
              Dijkstra's Algorithm
            </Button>
            <Button onClick={visualizeAstar}>
              Astar Algorithm
            </Button>
          </ButtonGroup>
          </Box>
            <div className="grid" >
              {gridState.grid?.map((row, rowIdx) => {
                return (
                  <div key={rowIdx}>
                    {row.map((node, nodeIdx) => {
                      const {row, col, isFinish, isStart, isWall} = node;
                      return (
                        <Spot
                          key={nodeIdx}
                          col={col}
                          isFinish={isFinish}
                          isStart={isStart}
                          isWall={isWall}
                          row={row}></Spot>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <Box>
              <Button marginTop={25} onClick={() => resetBoard()}>
                    Reset Grid
              </Button>
            </Box>
          </Paper>
        </Box>

      </>
    );
  }


const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < COLS; col++) {
       const wall = isArrayInArray(IS_WALL, [row, col])
      currentRow.push(createNode(col, row, wall));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row, wall) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    g: Infinity, 
    h: null, // heuristicDistance
    f: Infinity, 
    isVisited: false,
    isWall: wall,
    previousNode: null,
    neighbors: [],
  };
};

const isArrayInArray = (arr, curr) => {
  return arr.some((ele) => JSON.stringify(ele) === JSON.stringify(curr));
}

export default FindPath;

import React, { useState, useEffect } from 'react';
import './WarehouseMap.css';

// Define the grid layout
const gridSize = 3; // 3x3 warehouse grid layout with paths (4x4 including paths)
const gridMatrix = Array(gridSize * 2 + 1)
  .fill(0)
  .map((_, row) =>
    Array(gridSize * 2 + 1).fill(0).map((_, col) => ((row % 2 === 1 && col % 2 === 1) ? 1 : 0))
  ); // Paths are 0, storage cells are 1.

const WarehouseMap = () => {
  const [forkliftPosition, setForkliftPosition] = useState({ row: 0, col: 1 }); // Initial position
  const [path, setPath] = useState([]); // Stores the current calculated path

  // Function to move the forklift
  const moveForklift = (newRow, newCol) => {
    if (
      newRow >= 0 &&
      newRow <= gridSize * 2 &&
      newCol >= 0 &&
      newCol <= gridSize * 2 &&
      (newRow % 2 === 0 || newCol % 2 === 0) // Restrict movement to path cells only
    ) {
      setForkliftPosition({ row: newRow, col: newCol });
    }
  };

  // Pathfinding algorithm (BFS)
  const findShortestPath = (start, end) => {
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1],
    ]; // Up, down, left, right
    const queue = [[start, []]];
    const visited = Array.from({ length: gridMatrix.length }, () => Array(gridMatrix[0].length).fill(false));
    visited[start.row][start.col] = true;

    while (queue.length > 0) {
      const [{ row, col }, currentPath] = queue.shift();

      if (row === end.row && col === end.col) {
        return [...currentPath, { row, col }];
      }

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
          newRow >= 0 &&
          newRow < gridMatrix.length &&
          newCol >= 0 &&
          newCol < gridMatrix[0].length &&
          !visited[newRow][newCol] &&
          gridMatrix[newRow][newCol] === 0 // Ensure it's a path
        ) {
          visited[newRow][newCol] = true;
          queue.push([{ row: newRow, col: newCol }, [...currentPath, { row, col }]]);
        }
      }
    }

    return null; // No path found
  };

  // Handle cell click to calculate the shortest path
  const handleCellClick = (row, col) => {
    if (gridMatrix[row][col] === 0) { // Ensure it's a valid path cell
      const newPath = findShortestPath(forkliftPosition, { row, col });
      if (newPath) {
        setPath(newPath);
        animateForklift(newPath);
      } else {
        alert('No path found to the selected point.');
      }
    }
  };

  // Arrow key event handler
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { row, col } = forkliftPosition;

      switch (event.key) {
        case 'ArrowUp':
          moveForklift(row - 1, col);
          break;
        case 'ArrowDown':
          moveForklift(row + 1, col);
          break;
        case 'ArrowLeft':
          moveForklift(row, col - 1);
          break;
        case 'ArrowRight':
          moveForklift(row, col + 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [forkliftPosition]);

  // Animate forklift along the path
  const animateForklift = (path) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < path.length) {
        setForkliftPosition(path[index]);
        index++;
      } else {
        clearInterval(interval);
        setPath([]); // Clear the path after reaching the destination
      }
    }, 500); // Move every 500ms
  };

  // Render the grid
  const renderGrid = () => {
    const cells = [];
    for (let row = 0; row < gridMatrix.length; row++) {
      for (let col = 0; col < gridMatrix[row].length; col++) {
        const isForkliftHere = forkliftPosition.row === row && forkliftPosition.col === col;
        const isPath = gridMatrix[row][col] === 0;

        cells.push(
          <div
            key={`${row}-${col}`}
            className={`grid-cell ${isPath ? 'path' : 'storage'} ${isForkliftHere ? 'forklift' : ''}`}
            onClick={() => handleCellClick(row, col)}
          >
            {isForkliftHere ? '🚜' : isPath ? '' : '📦'}
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div className="warehouse-map">
      {renderGrid()}
    </div>
  );
};

export default WarehouseMap;

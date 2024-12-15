import React, { useState } from 'react';
import './ToggleGrid.css';

const ToggleGrid = () => {
  const gridSize = 7; // Define the grid size (7x7)

  const [grid, setGrid] = useState(
    Array(gridSize).fill(null).map((_, row) =>
      Array(gridSize).fill(0).map((_, col) => (
        // Mark odd row and column indices as paths (1) and others as storage (0)
        (row % 2 === 1 && col % 2 === 1) ? 1 : 0
      ))
    )
  );
  

  // Toggle cell state between "free" (0) and "obstructed" (1)
  const toggleCellState = (row, col) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((r) => [...r]); // Create a shallow copy of the grid
  
      // Only toggle cells that are not paths (not initially red)
      if (row % 2 === 0 || col % 2 === 0) {
        newGrid[row][col] = newGrid[row][col] === 0 ? 1 : 0;
      }
      return newGrid;
    });
  };
  

  // Render the grid
  const renderGrid = () => {
    return grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          className={`grid-cell ${cell === 0 ? 'free' : 'obstructed'}`}
          onClick={() => toggleCellState(rowIndex, colIndex)}
        ></div>
      ))
    );
  };

  return <div className="toggle-grid">{renderGrid()}</div>;
};

export default ToggleGrid;

import React, { useState, useEffect } from 'react';
import './WarehouseMap.css';

const WarehouseMap = () => {
  const gridSize = 3; // 3x3 warehouse grid layout with paths (4x4 including paths)
  const [forkliftPosition, setForkliftPosition] = useState({ row: 0, col: 1 }); // Initial position on path

  // Function to move the forklift to a specific path position
  const moveForklift = (newRow, newCol) => {
    // Ensure the forklift stays within the paths and grid boundaries
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

    // Add keydown event listener
    window.addEventListener('keydown', handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [forkliftPosition]); // Re-run effect when forkliftPosition changes

  // Render grid with buttons on paths and storage cells
  const renderGrid = () => {
    const cells = [];
    for (let row = 0; row <= gridSize * 2; row++) {
      for (let col = 0; col <= gridSize * 2; col++) {
        const isPath = row % 2 === 0 || col % 2 === 0; // Paths on even rows or columns
        const isForkliftHere = forkliftPosition.row === row && forkliftPosition.col === col;

        if (isPath) {
          cells.push(
            <button
              key={`${row}-${col}`}
              className={`grid-button ${isForkliftHere ? 'forklift' : ''}`}
              onClick={() => moveForklift(row, col)}
            >
              {isForkliftHere ? "🚜" : ""}
            </button>
          );
        } else {
          cells.push(
            <div
              key={`${row}-${col}`}
              className="grid-storage"
            >
              📦 {/* Storage item icon */}
            </div>
          );
        }
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

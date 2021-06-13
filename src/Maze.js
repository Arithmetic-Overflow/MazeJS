import React from 'react';
import './Maze.css'

// Defines a single cell
const Cell = (cell, key) => {
  return (
    <td className='maze-cell' key={key}>
      {cell}
    </td>
  );
}

// Creates a row
const constructRow = (row, key) => {
  return (
    <tr key={key}>
      {row.map((cell, i) => Cell(cell, key+'c'+i))}
    </tr>
  );
}

// Given a grid and id creates a maze
const constructMaze = (grid, key='m1') => {
  return (
    <table className='maze'>
      <tbody>
        {grid.map((row, i) => constructRow(row, key+'r'+i))}
      </tbody>
    </table>
  );
}

const Maze = ({ grid, id=1 }) => {
  const key = 'm' + id;
  return constructMaze(grid, key);
};

export default Maze;
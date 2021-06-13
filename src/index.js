import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import Maze from "./Maze"

ReactDOM.render(
  <React.StrictMode>
    <Maze grid={[[1, 2, 6], [3, 4, 2], [5, 6, 7]]} />

    <table className="maze">
      <tbody>
        <tr>
          <td className="maze-cell"> 1 </td>
          <td className="maze-cell"> 2 </td>
        </tr>
      </tbody>
    </table>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

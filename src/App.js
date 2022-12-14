import React, { useState } from 'react';
import './App.css';

function App() {
  const emptyGrid = [
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
  ];

  // https://stackoverflow.com/questions/32770321/connect-4-check-for-a-win-algorithm

  const [grid, setGrid] = useState(emptyGrid);
  const [turn, setTurn] = useState('r');
  const [winningTiles, setWinningTiles] = useState([]);
  const [win, setWin] = useState(false);
  const [redScore, setRedScore] = useState(0);
  const [yellowScore, setYellowScore] = useState(0);

  const getClass = (y, x) => {
    let win = false;
    winningTiles.forEach((t) => {
      if (t[0] === y && t[1] === x) {
        win = true;
      }
    });

    return win ? 'win-tile' : '';
  };

  const placeCounter = (y, x) => {
    if (grid[y][x] === '') {
      if ((x < 5 && grid[y][x + 1] !== '') || x === 5) {
        grid[y][x] = turn;
        turn === 'r' ? setTurn('y') : setTurn('r');
      } else {
        alert(
          'Please insert counter at first blank space form the bottom of the grid'
        );
      }
    }
  };

  // Check without knowing what the player's last move was.
  const checkWin = () => {
    // Horizontal check.
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 6; x++) {
        if (
          grid[y][x] !== '' &&
          grid[y + 1][x] === grid[y][x] &&
          grid[y + 2][x] === grid[y][x] &&
          grid[y + 3][x] === grid[y][x]
        ) {
          setWinningTiles([
            [y, x],
            [y + 1, x],
            [y + 2, x],
            [y + 3, x],
          ]);
          setWin(true);
          turn === 'r'
            ? setRedScore(redScore + 1)
            : setYellowScore(yellowScore + 1);
        }
      }
    }

    // Vertical check.
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 3; x++) {
        if (
          grid[y][x] !== '' &&
          grid[y][x + 1] === grid[y][x] &&
          grid[y][x + 2] === grid[y][x] &&
          grid[y][x + 3] === grid[y][x]
        ) {
          setWinningTiles([
            [y, x],
            [y, x + 1],
            [y, x + 2],
            [y, x + 3],
          ]);
          setWin(true);
          turn === 'r'
            ? setRedScore(redScore + 1)
            : setYellowScore(yellowScore + 1);
        }
      }
    }

    // Right diagonal check.
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 6; x++) {
        if (
          grid[y][x] !== '' &&
          y + 1 < 7 &&
          x - 3 > -1 &&
          grid[y + 1][x - 1] === grid[y][x] &&
          grid[y + 2][x - 2] === grid[y][x] &&
          grid[y + 3][x - 3] === grid[y][x]
        ) {
          setWinningTiles([
            [y, x],
            [y + 1, x - 1],
            [y + 2, x - 2],
            [y + 3, x - 3],
          ]);
          setWin(true);
          turn === 'r'
            ? setRedScore(redScore + 1)
            : setYellowScore(yellowScore + 1);
        }
      }
    }

    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 6; x++) {
        if (
          grid[y][x] !== '' &&
          y - 3 > -1 &&
          x - 3 > -1 &&
          grid[y - 1][x - 1] === grid[y][x] &&
          grid[y - 2][x - 2] === grid[y][x] &&
          grid[y - 3][x - 3] === grid[y][x]
        ) {
          setWinningTiles([
            [y, x],
            [y - 1, x - 1],
            [y - 2, x - 2],
            [y - 3, x - 3],
          ]);
          setWin(true);
          turn === 'r'
            ? setRedScore(redScore + 1)
            : setYellowScore(yellowScore + 1);
        }
      }
    }
  };
  return (
    <div className='App'>
      <div id='grid'>
        {grid.map((col, y) => {
          return (
            <div key={`col-${y}`}>
              {col.map((row, x) => {
                return (
                  <div
                    key={`cell-${x}`}
                    className='box'
                    onClick={() => {
                      if (!win) {
                        placeCounter(y, x);
                        checkWin();
                      }
                    }}
                  >
                    <div
                      key={`circle-${x}`}
                      style={{
                        borderRadius: '50%',
                        border: '1px solid black',
                        height: '60px',
                        width: '60px',
                        backgroundColor:
                          grid[y][x] === 'r'
                            ? 'rgb(179, 57, 57)'
                            : grid[y][x] === 'y'
                            ? 'rgb(211, 211, 67)'
                            : 'white',
                      }}
                      className={getClass(y, x)}
                    ></div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <button
        style={{ margin: '50px' }}
        onClick={() => {
          setGrid(emptyGrid);
          setWin(false);
          setWinningTiles([]);
        }}
      >
        {win ? 'Play again!' : 'Reset'}
      </button>
      <table>
        <tbody>
          <tr>
            <th style={{ color: 'rgb(179, 57, 57)', fontWeight: '600' }}>
              Red
            </th>
            <th style={{ color: 'rgb(211, 211, 67)', fontWeight: '600' }}>
              Yellow
            </th>
          </tr>
          <tr>
            <td>{redScore}</td>
            <td>{yellowScore}</td>
          </tr>
        </tbody>
      </table>
      <p>Created by SM, 2022</p>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import GridLayout from './GridLayout';
import { shuffleArray } from './utils';
import './App.css';

const initialGrids = Array.from({ length: 9 }, (_, index) => index + 1);

function App() {
  const [grids, setGrids] = useState(initialGrids);

  const shuffle = () => {
    setGrids(shuffleArray(grids));
  };

  return (
    <div className="App">
      <GridLayout stay={1000}>
        {grids.map((number) => <span key={number}>{number}</span>)}
      </GridLayout>
      <div style={{ marginTop: 20 }}>
        <button onClick={shuffle}>shuffle</button>
      </div>
    </div>
  );
}

export default App;

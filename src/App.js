import React, { useState, useCallback } from 'react';
import GridLayout, { GirdItem } from './GridLayout';
import { shuffleArray } from './utils';
import './App.css';

const initialGrids = Array.from({ length: 9 }, (_, index) => ({ number: index + 1, flipped: false }));

function App() {
  const [grids, setGrids] = useState(initialGrids);

  const shuffle = useCallback(() => {
    setGrids(gs => shuffleArray(gs));
  }, []);

  const toggleFlip = useCallback(() => {
    setGrids(gs => gs.map(g => ({
      ...g,
      flipped: !g.flipped,
    })));
  }, []);

  const setFlipped = useCallback((index, isFlipped) => {
    setGrids(gs => gs.map((g, i) => {
      if (i === index) {
        return { ...g, flipped: isFlipped };
      }
      return g;
    }));
  }, []);

  return (
    <div className="App">
      <GridLayout>
        {grids.map(({ number, flipped }, index) => (
          <GirdItem
            index={index}
            key={number}
            duration={300}
            stay={500}
            flipped={flipped}
            setFlipped={setFlipped}
          >
            {number}
          </GirdItem>
        ))}
      </GridLayout>
      <div style={{ marginTop: 20 }}>
        <button onClick={shuffle}>shuffle</button>
        <button onClick={toggleFlip}>toggle flip all</button>
      </div>
    </div>
  );
}

export default App;

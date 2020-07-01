import React, { useState, useCallback } from 'react';
import GridLayout, { GirdItem } from './GridLayout';
import { shuffleArray } from './utils';
import './App.css';

const tick = (fn, times) => {
  if (times <= 0) {
    return;
  }
  setTimeout(() => {
    fn(times);
    tick(fn, times - 1);
  }, 100);
};

const initialGrids = Array.from({ length: 9 }, (_, index) => ({ number: index + 1, flipped: false }));

function App() {
  const [grids, setGrids] = useState(initialGrids);

  const shuffle = useCallback(() => {
    setGrids(gs => shuffleArray(gs));
  }, []);

  const setFlipped = useCallback((index, isFlipped) => {
    setGrids(gs => gs.map((g, i) => {
      if (i === index) {
        return { ...g, flipped: isFlipped };
      }
      return g;
    }));
  }, [setGrids]);

  const toggleFlip = useCallback(() => {
    const length = grids.length;

    tick(times => {
      const index = length - times;
      setFlipped(index, !grids[index].flipped);
    }, length);

  }, [grids, setFlipped]);


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
            delay={index * 300}
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

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

const initialGrids = Array.from({ length: 9 }, (_, index) => ({ number: index + 1, flipped: true, shuffling: false }));

function App() {
  const [grids, setGrids] = useState(initialGrids);

  const shuffle = useCallback(() => {
    setGrids(gs => shuffleArray(gs).map(g => ({ ...g, shuffling: true })));

    setTimeout(() => {
      setGrids(gs => gs.map(g => ({ ...g, shuffling: false })));
    }, 3000);
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

  const turnFrontAll = useCallback(() => {
    const length = grids.length;

    tick(times => {
      const index = length - times;
      setFlipped(index, false);
    }, length);
  }, [grids, setFlipped]);

  const turnBackAll = useCallback(() => {
    const length = grids.length;

    tick(times => {
      const index = length - times;
      setFlipped(index, true);
    }, length);

  }, [grids, setFlipped]);

  return (
    <div className="App">
      <GridLayout>
        {grids.map(({ number, flipped, shuffling }, index) => (
          <GirdItem
            index={index}
            key={number}
            duration={800}
            flipped={flipped}
            shuffling={shuffling}
            setFlipped={setFlipped}
          >
            {number}
          </GirdItem>
        ))}
      </GridLayout>
      <div style={{ marginTop: 20 }}>
        <button onClick={shuffle}>洗牌</button>
        <button onClick={toggleFlip}>翻开/盖上</button>
        <button onClick={turnFrontAll}>全部翻开</button>
        <button onClick={turnBackAll}>全部盖上</button>
      </div>
    </div>
  );
}

export default App;

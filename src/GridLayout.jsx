import React, { useEffect, useRef } from 'react';
import styles from './GridLayout.module.css';
import { getPosition } from './utils';
import Card from '@/components/Card';

const cols = 3;

export const GirdItem = React.memo(({ children, index, duration, flipped, setFlipped, shuffling }) => {
  const domRef = useRef();

  useEffect(() => {
    if (shuffling) {
      const { x, y } = getPosition(index, cols);

      domRef.current.style.cssText = `
        transition: transform ${duration}ms;
        transform: translate(${(1 - x) * 160}px, ${(1 - y) * 160}px);
        z-index: ${index};
        animation-delay: ${Math.random() * 1000}ms;
      `;
    } else {
      domRef.current.style.transform = `translate(0, 0)`;
    }
  }, [index, shuffling, domRef, duration]);

  useEffect(() => {
    setFlipped(index, true);
  }, [index, setFlipped]);

  const { x, y } = getPosition(index, cols);

  return (
    <div
      ref={domRef}
      className={[styles.gridItem, shuffling ? styles.shuffling : false].filter(Boolean).join(' ')}
      onClick={() => setFlipped(index, !flipped)}
    >
      <Card
        front={(
          <div>{children}: ({x}, {y})</div>
        )}
        back={(
          <div>back</div>
        )}
        flipped={flipped}
      />
    </div>
  );
});

const GridLayout = ({ children }) => {
  return (
    <div className={styles.gridLayout}>
      {children}
    </div>
  );
};

export default GridLayout;
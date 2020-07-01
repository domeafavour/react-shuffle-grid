import React, { useRef, useEffect } from 'react';
import styles from './GridLayout.module.css';
import { getPosition } from './utils';
import Card from './components/Card';

const cols = 3;

export const GirdItem = React.memo(({ children, index, duration, stay, flipped, setFlipped }) => {
  const domRef = useRef();

  useEffect(() => {
    const { x, y } = getPosition(index, cols);

    domRef.current.style.cssText = `
      transition: transform ${duration}ms;
      transform: translate(${(1 - x) * 160}px, ${(1 - y) * 160}px);
      z-index: ${index};
    `;

    setTimeout(() => {
      domRef.current.style.transform = `translate(0, 0)`;
    }, duration + stay + Math.random() * 300 /** 添加随机时间，使卡片扩散开的时间不一样 */);

  }, [index, duration, stay]);

  useEffect(() => {
    setFlipped(index, false);
  }, [index, setFlipped]);

  const { x, y } = getPosition(index, cols);


  return (
    <div
      ref={domRef}
      className={styles.gridItem}
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
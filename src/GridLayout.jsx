import React, { useRef, useEffect } from 'react';
import styles from './GridLayout.module.css';
import { getPosition } from './utils';

const cols = 3;

const GirdItem = React.memo(({ children, index, duration, stay }) => {
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
    }, duration + stay);

  }, [index, duration, stay]);

  const { x, y } = getPosition(index, cols);

  return (
    <div
      ref={domRef}
      className={styles.gridItem}
    >
      {children}: ({x}, {y})
    </div>
  );
});

const GridLayout = ({ children, duration = 500, stay = 500 }) => {
  return (
    <div className={styles.gridLayout}>
      {React.Children.map(children, (number, index) => (
        <GirdItem
          key={number}
          index={index}
          duration={duration}
          stay={stay}
        >
          {number}
        </GirdItem>
      ))}
    </div>
  );
};

export default GridLayout;
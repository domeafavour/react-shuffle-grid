import React from 'react';
import classNames from 'classnames';
import styles from './index.module.css';

const Card = ({ front, back, flipped }) => {
  return (
    <div className={classNames(styles.card, { flipped })}>
      <div className={styles.cardFront}>{front}</div>
      <div className={styles.cardBack}>{back}</div>
    </div>
  );
};

export default Card;
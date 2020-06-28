export const shuffleArray = array => {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * i);
    [shuffled[j], shuffled[i]] = [shuffled[i], shuffled[j]];
  }
  return shuffled;
};

export const getPosition = (index, cols) => {
  if (index === 0) {
    return {
      x: 0,
      y: 0,
    };
  }
  return {
    x: index % cols,
    y: Math.floor(index / cols),
  };
};
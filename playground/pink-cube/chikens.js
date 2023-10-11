const farms = [
  {
    chickens: 2,
  },
  {
    chickens: 10,
  },
  {
    chickens: 'null',
  },
  {
    chickens: 1,
  },
];

const sumChikens = farms.reduce((acc, item) => {
  if (typeof item.chickens === 'number') {
    return acc + item.chickens;
  }
  return acc;
}, 0);

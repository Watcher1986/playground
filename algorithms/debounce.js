const arr = [
  { name: 'first', timeout: 3000 },
  { name: 'second', timeout: 5000 },
  { name: 'third', timeout: 2000 },
];

const run = async (arr) => {
  const debounce = (name, ms) => {
    if (debounce.timeoutId) clearTimeout(debounce.timeoutId);
    return new Promise((resolve) => {
      debounce.timeoutId = setTimeout(() => {
        console.log(name);
        resolve();
      }, ms);
    });
  };

  for (const item of arr) {
    await debounce(item.name, item.timeout);
  }
};

run(arr);

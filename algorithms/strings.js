const abc = ['a', 'b', 'c', 'd', 'e'];

const cb = (acc, val) => {
  return acc + val;
};

const reduceRight = (arr, cb, acc = '') => {
  for (let i = arr.length - 1; i >= 0; i--) {
    acc = cb(acc, arr[i]);
  }
  return acc;
};

console.log(reduceRight(abc, cb)); // third argument is optional

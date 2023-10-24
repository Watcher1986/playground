const MAX_HOURS = 23;
const MAX_MINS = 59;

const arr = [1, 2, 3, 4];

const timeIterator = (arr, maxTimeValue) => {
  let result;

  for (let i = maxTimeValue; i > 0; i--) {
    const temp = String(i / 10).split('.');
    const [d1, d2] = temp;

    if (
      arr.includes(+d1) &&
      arr.includes(+d2) &&
      arr.indexOf(+d1) !== arr.indexOf(+d2)
    ) {
      result = i;
      arr.splice(arr.indexOf(+d1), 1);
      arr.splice(arr.indexOf(+d2), 1);
      break;
    }
  }

  return result;
};

const calculateMaxTime = (arr) => {
  const arrCopy = [...arr];

  const hours = timeIterator(arrCopy, MAX_HOURS);
  const mins = timeIterator(arrCopy, MAX_MINS);

  return `${hours}:${mins}`;
};

calculateMaxTime(arr);

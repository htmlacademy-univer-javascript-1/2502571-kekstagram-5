const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomElementsArray = (array, count) => {
  const randomIndexList = [];
  const max = Math.min(count, array.length);
  while (randomIndexList.length < max) {
    const index = getRandomInteger(0, array.length - 1);
    if (!randomIndexList.includes(index)) {
      randomIndexList.push(index);
    }
  }
  return randomIndexList.map((index) => array[index]);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const getUniqueNumber = (list, usedNumbers) => {
  for (let i = 0; i < list.length; i++){
    if (usedNumbers.includes(list[i]) === false){
      usedNumbers.push(list[i]);
      return list[i];
    }
  }
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  getRandomInteger,
  getUniqueNumber,
  getRandomElementsArray,
  isEscapeKey,
  debounce
};

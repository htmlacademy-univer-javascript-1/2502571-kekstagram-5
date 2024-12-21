const SCALE_STEP = 25;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

const modalElement = document.querySelector('.img-upload');
const smallButtonElement = modalElement.querySelector('.scale__control--smaller');
const bigButtonElement = modalElement.querySelector('.scale__control--bigger');
const scaleInputElement = modalElement.querySelector('.scale__control--value');
const imageElement = modalElement.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleInputElement.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleInputElement.value, 10);
  const newValue = currentValue - SCALE_STEP;
  if (newValue >= MIN_SCALE) {
    scaleImage(newValue);
  } else {
    smallButtonElement.setAttribute('disabled');
  }
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleInputElement.value, 10);
  const newValue = currentValue + SCALE_STEP;
  if (newValue <= DEFAULT_SCALE) {
    scaleImage(newValue);
  } else {
    bigButtonElement.setAttribute('disabled');
  }
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

smallButtonElement.addEventListener('click', onSmallerButtonClick);
bigButtonElement.addEventListener('click', onBiggerButtonClick);

export{ resetScale };

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

// Собираем нужные элементы в объект
const elements = {
  modal: document.querySelector('.img-upload'),
  smallButton: document.querySelector('.scale__control--smaller'),
  bigButton: document.querySelector('.scale__control--bigger'),
  scaleInput: document.querySelector('.scale__control--value'),
  image: document.querySelector('.img-upload__preview img'),
};

const scaleImage = (value) => {
  elements.image.style.transform = `scale(${value / 100})`;
  elements.scaleInput.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(elements.scaleInput.value, 10);
  const newValue = currentValue - SCALE_STEP;
  if (newValue >= MIN_SCALE) {
    scaleImage(newValue);
  }
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(elements.scaleInput.value, 10);
  const newValue = currentValue + SCALE_STEP;
  if (newValue <= DEFAULT_SCALE) {
    scaleImage(newValue);
  }
};

const resetScale = () => scaleImage(DEFAULT_SCALE);

elements.smallButton.addEventListener('click', onSmallerButtonClick);
elements.bigButton.addEventListener('click', onBiggerButtonClick);

export { resetScale };

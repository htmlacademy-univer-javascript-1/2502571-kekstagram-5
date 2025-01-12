import { resetScale } from './scale.js';
import { init as initEffect, reset as resetEffect } from './effects.js';
import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './message.js';

const elements = {
  body: document.querySelector('body'),
  form: document.querySelector('.img-upload__form'),
  overlay: document.querySelector('.img-upload__overlay'),
  cancelButton: document.querySelector('.img-upload__cancel'),
  fileField: document.querySelector('.img-upload__input'),
  commentField: document.querySelector('.text_description'),
  imgPreview: document.querySelector('.img-upload__preview img'),
  effectsPreview: document.querySelectorAll('.effects__preview'),
  submitButton: document.querySelector('.img-upload__submit'),
  hashtagField: document.querySelector('.text__hashtags'),
};

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хештегов`,
  NOT_UNIQUE: 'Хештеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хештег',
};

const pristine = new Pristine(elements.form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const showModal = (evt) => {
  const file = evt.target.files[0];
  if (file) {
    const imageURL = URL.createObjectURL(file);
    elements.imgPreview.src = imageURL;

    elements.effectsPreview.forEach((element) => {
      element.style.backgroundImage = `url('${imageURL}')`;
    });
  }
  elements.form.addEventListener('submit', onFormSubmit);/* eslint-disable-line */
  elements.overlay.classList.remove('hidden');
  elements.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  elements.form.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  elements.overlay.classList.add('hidden');
  elements.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  elements.form.removeEventListener('submit', onFormSubmit);/* eslint-disable-line */
};

const isTextFieldFocused = () =>
  document.activeElement === elements.hashtagField ||
  document.activeElement === elements.commentField;

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = (evt) => {
  showModal(evt);
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    elements.submitButton.disabled = true;
    try {
      await sendData(new FormData(elements.form));
      showSuccessMessage();
      hideModal();
    } catch {
      showErrorMessage();
      hideModal();
    } finally {
      elements.submitButton.disabled = false;
    }
  }
};

elements.fileField.addEventListener('change', onFileInputChange);
elements.cancelButton.addEventListener('click', onCancelButtonClick);
initEffect();

const normalizeTags = (tagString) =>
  tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(elements.hashtagField, hasValidCount, ErrorText.INVALID_COUNT, 3, true);
pristine.addValidator(elements.hashtagField, hasUniqueTags, ErrorText.NOT_UNIQUE, 1, true);
pristine.addValidator(elements.hashtagField, hasValidTags, ErrorText.INVALID_PATTERN, 2, true);

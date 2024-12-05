import {objects} from './data.js';
import {openBigPicture} from './big-picture.js';


const thumbnailTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = (data) => {
  const { likes, url, description, comments } = data;
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  thumbnail.addEventListener('click', () => {
    openBigPicture(data);
  });

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

renderThumbnails(objects);

import { openBigPicture } from './big-picture.js';

const elements = {
  thumbnailTemplate: document.querySelector('#picture').content.querySelector('.picture'),
  container: document.querySelector('.pictures'),
};

const createThumbnail = (data) => {
  const { likes, url, description, comments } = data;
  const thumbnail = elements.thumbnailTemplate.cloneNode(true);

  const thumbnailImage = thumbnail.querySelector('.picture__img');
  const thumbnailComments = thumbnail.querySelector('.picture__comments');
  const thumbnailLikes = thumbnail.querySelector('.picture__likes');

  thumbnailImage.src = url;
  thumbnailImage.alt = description;
  thumbnailComments.textContent = comments.length;
  thumbnailLikes.textContent = likes;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
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

  elements.container.append(fragment);
};

export { renderThumbnails };

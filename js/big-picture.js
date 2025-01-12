import { isEscapeKey } from './util.js';

// Собираем все необходимые элементы в объект
const elements = {
  body: document.querySelector('body'),
  closeButton: document.querySelector('.big-picture__cancel'),
  bigPicture: document.querySelector('.big-picture'),
  commentsList: document.querySelector('.social__comments'),
  commentsLoader: document.querySelector('.comments-loader'),
  socialComments: document.querySelector('.social__comment-count'),
};

const POSSIBLE_COMMENTS_GROUP = 5;

let commentsShown = 0;
let comments = [];

const renderPictureDetails = ({ url, likes, description }) => {
  const bigPictureImg = elements.bigPicture.querySelector('.big-picture__img img');
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  elements.bigPicture.querySelector('.likes-count').textContent = likes;
  elements.bigPicture.querySelector('.social__caption').textContent = description;
};

const createComment = ({ name, avatar, message }) => {
  const comment = document.createElement('li');
  comment.innerHTML =
    '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');

  const picture = comment.querySelector('.social__picture');
  picture.alt = name;
  picture.src = avatar;

  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  commentsShown += POSSIBLE_COMMENTS_GROUP;

  if (commentsShown >= comments.length) {
    elements.commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    elements.commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let index = 0; index < commentsShown; index++) {
    fragment.append(createComment(comments[index]));
  }

  elements.commentsList.innerHTML = '';
  elements.commentsList.append(fragment);
  elements.socialComments.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = (data) => {
  elements.bigPicture.classList.remove('hidden');
  elements.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
  renderPictureDetails(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

function closeBigPicture() {
  elements.bigPicture.classList.add('hidden');
  elements.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  commentsShown = 0;
}

elements.commentsLoader.addEventListener('click', () => {
  renderComments();
});

const onCloseButtonClick = () => {
  closeBigPicture();
};

elements.closeButton.addEventListener('click', onCloseButtonClick);

export { openBigPicture };

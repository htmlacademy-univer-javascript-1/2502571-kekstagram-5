import {renderThumbnails} from './thumbnail.js';
import {getRandomElementsArray, debounce} from './util.js';

const MAX_RANDOM_THUMBNAILES_COUNT = 10;
const ACTIVE_CLASS = 'img-filters__button--active';

const filterBlock = document.querySelector('.img-filters');
const defaultfFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

const getRandomThumbnailes = (photos, count) => getRandomElementsArray(photos, count);

const sortByComments = (firstPhoto, secondPhoto) => secondPhoto.comments.length - firstPhoto.comments.length;

const getDiscussedThumbnailes = (photos) => photos.slice().sort(sortByComments);

const removeThumbnailes = () => document.querySelectorAll('.picture').forEach((photo) => photo.remove());


const debouncedRenderThumbnails = debounce((filteredPhotos) => {
  removeThumbnailes();
  renderThumbnails(filteredPhotos);
});

const changeThumbnailes = (photos, filter) => {
  const activeFilter = document.querySelector(`.${ACTIVE_CLASS}`);
  activeFilter.classList.remove(ACTIVE_CLASS);
  filter.classList.add(ACTIVE_CLASS);
  debouncedRenderThumbnails(photos);
};

export const showFilteredPhotos = (photos) => {
  renderThumbnails(photos);
  filterBlock.classList.remove('img-filters--inactive');
  defaultfFilter.addEventListener('click',() => changeThumbnailes(photos, defaultfFilter));
  randomFilter.addEventListener('click', () => changeThumbnailes(getRandomThumbnailes(photos, MAX_RANDOM_THUMBNAILES_COUNT), randomFilter));
  discussedFilter.addEventListener('click', () => changeThumbnailes(getDiscussedThumbnailes(photos), discussedFilter));
};

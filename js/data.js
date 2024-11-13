import { getRandomInteger, getRandomArrayElement, createIdGenerator } from './util.js';

const PICTURE_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const AVATAR_COUNT = 6;
const COMMENT_COUNT = 30;
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTIONS = [
  'Захватывающий вид на закат над горами.',
  'Уютный уголок с чашкой горячего кофе.',
  'Яркие краски осеннего леса.',
  'Ночная городская панорама с огнями.',
  'Тихий пляж с белым песком и голубым морем.',
  'Весенний сад в полном расцвете.',
  'Старинная улочка с уютными кафе.',
  'Величественный водопад в тропическом лесу.',
  'Поле подсолнухов под ясным небом.'
];
const NAMES = ['Анфиса', 'Семен', 'Василий', 'Тамара', 'Андрей', 'Алина', 'Геннадий'];

const generateCommentId = createIdGenerator();

const createMessage = () => Array.from (
  { length: getRandomInteger(1,2) },
  () => getRandomArrayElement(COMMENTS),
).join('');

export const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

export const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  descriptions: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: Array.from(
    { length: getRandomInteger(0, COMMENT_COUNT) },
    createComment,
  ),
});

export const getPictures = () => Array.from(
  { length: PICTURE_COUNT },
  (_, index) => createPicture(index + 1),
);

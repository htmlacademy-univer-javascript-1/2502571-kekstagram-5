import { getRandomInteger, createUniqueRandomNumberList, getUniqueNumber } from './util.js';

const PICTURE_COUNT = 25;

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const names = ['Анфиса', 'Семен', 'Василий', 'Тамара', 'Андрей', 'Алина', 'Геннадий'];

const descriptions = [
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

const COMMENT_COUNT = getRandomInteger(0, 30);

const usedObjectId = [];
const usedCommentId = [];
const usedUrl = [];
const objectIdList = createUniqueRandomNumberList(1, PICTURE_COUNT, PICTURE_COUNT);
const commentIdList = createUniqueRandomNumberList(1, 999, COMMENT_COUNT);
const objectUrlList = createUniqueRandomNumberList(1, PICTURE_COUNT, PICTURE_COUNT);

const createComment = () => ({
  id: getUniqueNumber(commentIdList, usedCommentId),
  avatar: `img/avatar-${ String(getRandomInteger(1, 6)) }.svg`,
  message: messages[getRandomInteger(0, 5)],
  name: names[getRandomInteger(0, 5)],
});

const createObject = () => ({
  id: getUniqueNumber(objectIdList, usedObjectId),
  url: `photos/${ String(getUniqueNumber(objectUrlList, usedUrl)) }.jpg`,
  description: descriptions[getRandomInteger(0, 5)],
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(0, COMMENT_COUNT) }, createComment),
});

const objects = Array.from({length: PICTURE_COUNT}, createObject);

export {objects};

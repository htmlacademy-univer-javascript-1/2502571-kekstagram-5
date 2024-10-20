/* eslint-disable */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Артём',
  'Ирина',
  'Сергей',
  'Мария',
  'Алексей',
  'Елена',
  'Дмитрий',
  'Ольга',
  'Николай',
  'Анна'
];

const photoIds = Array.from({ length: 25 }, (_, index) => index + 1);

let usedCommentIds = [];

function generateUniqueCommentId() {
  let id;
  do {
    id = getRandomNumber(1, 1000);
  } while (usedCommentIds.includes(id));
  usedCommentIds.push(id);
  return id;
}

function createComment() {
  const avatarNumber = getRandomNumber(1, 6);
  const messageCount = getRandomNumber(1, 2);

  const message = Array.from({ length: messageCount }, () => messages[getRandomNumber(0, messages.length - 1)]).join(' ');
  return {
    id: generateUniqueCommentId(),
    avatar: `img/avatar-${avatarNumber}.svg`,
    message: message,
    name: names[getRandomNumber(0, names.length - 1)]
  };
}

function createComments() {
  const commentsCount = getRandomNumber(0, 30);
  return Array.from({ length: commentsCount }, createComment);
}

function createPhotoDescription() {
  const descriptions = [
    'Красивый пейзаж на закате.',
    'Весёлая вечеринка с друзьями.',
    'Удивительный момент из путешествия.',
    'Моё новое хобби - фотография.',
    'Наслаждаюсь природой и свежим воздухом.'
  ];
  return descriptions[getRandomNumber(0, descriptions.length - 1)];
}

const photos = photoIds.map((id) => {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: createPhotoDescription(),
    likes: getRandomNumber(15, 200),
    comments: createComments()
  };
});

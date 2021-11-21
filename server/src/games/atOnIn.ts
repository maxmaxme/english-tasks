import { Game, GAME_TYPES } from '../shared/types/game';

const game: Game = {
  id: NaN,
  name: 'Предлоги at/on/in',
  hints: [
    {
      title: 'at',
      content: `- со временем (at 3 o'clock, at 3am)
- с праздниками (at Christmas, at weekend)
- в выражениях (at the moment, at present, at night, at noon/lunchtime)`,
    },
    {
      title: 'in',
      content: `- с месяцами (in March, in December)
- с временами года (in winter, in spring)
- с годами (in 1999, in 2014)
- с веками (in the 21st century)`,
    },
    {
      title: 'on',
      content: `- с днями (on Monday, on Saturday)
- с датами (on 3rd June, on December 24)
- с прилагательными + day (on a cold day, on a rainy day)
- с определённой частью дня (on Friday evening)`,
    },
  ],
  type: GAME_TYPES.QUIZ,
  quizQuestions: [
    { question: '... the morning', answers: [{ text: 'at' }, { text: 'on' }, { text: 'in', correct: true }] },
    { question: '... the afternoon', answers: [{ text: 'at' }, { text: 'on' }, { text: 'in', correct: true }] },
    { question: '... (the) summer', answers: [{ text: 'at' }, { text: 'on' }, { text: 'in', correct: true }] },
    { question: '... 1980', answers: [{ text: 'at' }, { text: 'on' }, { text: 'in', correct: true }] },
    { question: '... the 1900s', answers: [{ text: 'at' }, { text: 'on' }, { text: 'in', correct: true }] },
    { question: '... the 17th century', answers: [{ text: 'at' }, { text: 'on' }, { text: 'in', correct: true }] },
    { question: '... the Easter holiday', answers: [{ text: 'at' }, { text: 'on' }, { text: 'in', correct: true }] },

    { question: '... Monday', answers: [{ text: 'at' }, { text: 'in' }, { text: 'on', correct: true }] },
    { question: '... Saturday', answers: [{ text: 'at' }, { text: 'in' }, { text: 'on', correct: true }] },
    { question: '... June 3rd', answers: [{ text: 'at' }, { text: 'in' }, { text: 'on', correct: true }] },
    { question: '... 1st October 2013', answers: [{ text: 'at' }, { text: 'in' }, { text: 'on', correct: true }] },
    { question: '... Christmas day', answers: [{ text: 'at' }, { text: 'in' }, { text: 'on', correct: true }] },
    { question: '... my birthday', answers: [{ text: 'at' }, { text: 'in' }, { text: 'on', correct: true }] },
    { question: '... Tuesday evening', answers: [{ text: 'at' }, { text: 'in' }, { text: 'on', correct: true }] },

    { question: '... 9 am', answers: [{ text: 'on' }, { text: 'in' }, { text: 'at', correct: true }] },
    { question: '... 6 o\'clock', answers: [{ text: 'on' }, { text: 'in' }, { text: 'at', correct: true }] },
    { question: '... 6 pm', answers: [{ text: 'on' }, { text: 'in' }, { text: 'at', correct: true }] },
    { question: '... night', answers: [{ text: 'on' }, { text: 'in' }, { text: 'at', correct: true }] },
    { question: '... noon', answers: [{ text: 'on' }, { text: 'in' }, { text: 'at', correct: true }] },
    { question: '... midday', answers: [{ text: 'on' }, { text: 'in' }, { text: 'at', correct: true }] },
    { question: '... Easter', answers: [{ text: 'on' }, { text: 'in' }, { text: 'at', correct: true }] },
    { question: '... Christmas', answers: [{ text: 'on' }, { text: 'in' }, { text: 'at', correct: true }] },
  ],
};

export default game;

import { Game, GAME_TYPES } from '../shared/types/game';

const answers = [{ text: 'at' }, { text: 'on' }, { text: 'in' }, { text: 'ничего' }];
const answer = (t: string) => ({ answers: answers.map((a) => ({ ...a, correct: t === a.text })) });

const game: Game = {
  id: NaN,
  name: 'Предлоги at/on/in',
  hints: [
    {
      title: 'at',
      content: `- часовое время (at 2 o'clock, at 3am, at half past eleven)
- части суток (at night, at noon)

#### исключения:
- праздники (at Christmas, at Easter) + at weekend
- at the moment 
- at present
- at the same time.`,
    },
    {
      title: 'in',
      content: `- с месяцами (in March, in December)
- с временами года (in winter, in spring)
- с годами (in 1999, in 2014)
- с веками (in the 21st century)
- «через какое-то время» для будущего времени (in a few minutes, in the future)

#### исключения:
- части суток (in the morning, in the afternoon, in the evening)`,
    },
    {
      title: 'on',
      content: `- с днями (on Monday, on Saturday, on the day of his arrival)
- с датами (on 3rd June, on December 24)
- Если **перед** временным промежутком стоит определение (on Friday morning, on Christmas day)
- с прилагательными + day (on a cold day, on a rainy day)

#### исключения:
- если определение стоит **после** временного промежутка, то используется предлог __in__ (In the morning of his wedding)`,
    },
    {
      title: 'last, next, this, every',
      content: `Мы не ставим никакие предлоги перед last, next, this, every.
- last year, last Monday, next week, every day`,
    },
  ],
  type: GAME_TYPES.QUIZ,
  quizQuestions: [
    { question: '... the morning', ...answer('in') },
    { question: '... the afternoon', ...answer('in') },
    { question: '... (the) summer', ...answer('in') },
    { question: '... January', ...answer('in') },
    { question: '... April', ...answer('in') },
    { question: '... 1980', ...answer('in') },
    { question: '... the 1900s', ...answer('in') },
    { question: '... the 17th century', ...answer('in') },
    { question: '... the Easter holiday', ...answer('in') },
    { question: '... two hours', ...answer('in') },
    { question: '... a few minutes', ...answer('in') },

    { question: '... Monday', ...answer('on') },
    { question: '... Saturday', ...answer('on') },
    { question: '... June 3rd', ...answer('on') },
    { question: '... 1st October 2013', ...answer('on') },
    { question: '... Christmas day', ...answer('on') },
    { question: '... my birthday', ...answer('on') },
    { question: '... Tuesday evening', ...answer('on') },

    { question: '... 9 am', ...answer('at') },
    { question: '... 6 o\'clock', ...answer('at') },
    { question: '... 6 pm', ...answer('at') },
    { question: '... night', ...answer('at') },
    { question: '... weekends', ...answer('at') },
    { question: '... noon', ...answer('at') },
    { question: '... midday', ...answer('at') },
    { question: '... Easter', ...answer('at') },
    { question: '... Christmas', ...answer('at') },

    { question: '... last week', ...answer('ничего') },
    { question: '... next year', ...answer('ничего') },
    { question: '... every month', ...answer('ничего') },
    { question: '... this day', ...answer('ничего') },
  ],
  questionsLimit: 5,
};

export default game;

const moment = require('moment');

let newItem = {
  word: { kau: 'buy' },
  easiness: 2.5,
  consecutiveCorrectAnswer: 2,
  dueDate: null,
  responseTime: 1000,
  correct: null
};

let newItem1 = {
  word: { inu: 'dog' },
  easiness: 2.5,
  consecutiveCorrectAnswer: 1,
  dueDate: null,
  responseTime: 20000,
  correct: null
};

const item = [];
item.push(newItem);
item.push(newItem1);

const checkDueDates = (items, now) => {
  const itemsToBeReviewed = [];
  for (let key of items) {
    if (key['dueDate'] === null || key['dueDate'].getTime() > now.getTime()) {
      itemsToBeReviewed.push(key);
    }
  }
  return itemsToBeReviewed;
};

const getPerformanceRating = items => {
  let performanceRating = null;
  for (let key of items) {
    if (key['responseTime']) {
      performanceRating = Math.max(0, 5 - parseInt(key['responseTime'] / 5000));
    }
    if (key['consecutiveCorrectAnswer']) {
      console.log('test');
      correct = Math.random() > 0.5;
      if (correct) {
        key['consecutiveCorrectAnswer'] = key['consecutiveCorrectAnswer'] + 1;
      } else {
        key['consecutiveCorrectAnswer'] = 0;
      }
      key['correct'] = correct;
    }
    key.performanceRating = performanceRating;
  }
  return items;
};

const upDateNextDueDate = item => {
  let now = moment();
  for (let key of item) {
    if (key['easiness']) {
      key['easiness'] +=
        -0.8 +
        0.28 * key['performanceRating'] +
        0.02 * Math.pow(key['performanceRating'], 2);
    }
    if (key['correct']) {
      key['dueDate'] = moment(now).add(
        6 * Math.pow(key['easiness'], key['consecutiveCorrectAnswer'] - 1),
        'day'
      );
    } else {
      key['dueDate'] = moment(now).add(1, 'day');
    }
  }

  return item;
};
let d1 = new Date();
const reviewedItems = checkDueDates(item, d1);
const ratedItems = getPerformanceRating(reviewedItems);
const items = upDateNextDueDate(ratedItems);
console.log(items);

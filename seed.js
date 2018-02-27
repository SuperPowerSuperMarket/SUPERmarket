const db = require('./server/db/models')
const User = require('./server/db/models/user')
const Superpower = require('./server/db/models/superpowers')
const Review = require('./server/db/models/review')


const superpowers = [{
  name: 'Lightning Speed',
  description: 'will make you fast as lightning',
  imageUrl: '',
  stock: 4,
  tags: ['travel', 'speed', 'weather']
}, {
  name: 'X-Ray Vision',
  description: 'Allows you to see through walls!',
  imageUrl: '',
  stock: 2,
  tags: ['vision', 'spying', 'creepy']
}, {
  name: 'Teleportation',
  description: 'Allows you to get from one place to the next in no time. Literally.',
  imageUrl: '',
  stock: 10,
  tags: ['travel', 'speed']
}, {
  name: 'Invisibility',
  description: 'Not everyone wants to be seen.',
  imageUrl: '',
  stock: 3,
  tags: ['travel', 'privacy', 'spying', 'creepy', 'transformation']
}, {
  name: 'Shapeshifting',
  description: 'You can be whatever you want!',
  imageUrl: '',
  stock: 7,
  tags: ['transformation', 'travel']
}, {
  name: 'Time Travel',
  description: 'Travel to another era, past or future.',
  imageUrl: '',
  stock: 5,
  tags: ['travel', 'history', 'spying']
}]

const users = [{
  firstName: 'Sarah',
  lastName: 'Laine',
  email: 'sarah@gmail.com',
  imageUrl: ''
}, {
  firstName: 'Connor',
  lastName: 'Kirkwood',
  email: 'connor@gmail.com',
  imageUrl: ''
}, {
  firstName: 'Sunny',
  lastName: 'Kim',
  email: 'sunny@gmail.com',
  imageUrl: ''
}, {
  firstName: 'Luis',
  lastName: 'Rincon',
  email: 'luis@gmail.com',
  imageUrl: ''
}]


const authorId = () => Math.round(Math.random() * (users.length - 1)) + 1;

const reviews = [{
  stars: 4,
  content: 'I loved flying everywhere! It was the coolest!',
  dateCreated: '2018-01-12',
  authorId: authorId()
}, {
  stars: 3,
  content: 'I didn\'t like being invisible. People kept bumping into me as I walked on the sidewalk. But, it definitely worked as advertised! I was not seen.',
  dateCreated: '2017-06-24',
  authorId: authorId()
}, {
  stars: 5,
  content: 'Teleportation really improved my morning commute. I will definitely be using this again!',
  dateCreated: '2017-03-12',
  authorId: authorId()
}]


const seed = () =>
  Promise.all(superpowers.map(superpower =>
    Superpower.create(superpower))
  )
  .then(() =>
  Promise.all(users.map(user =>
    User.create(user))
  ))
  .then(() =>
  Promise.all(reviews.map(review =>
    Review.create(review)
  )))

const main = () => {
  console.log('It\'s a bird! It\'s a plane!');
  db.sync({ force: true })
    .then(() => {
      console.log('It\'s SUPERmarket!!!');
      return seed();
    })
    .catch(err => {
      console.log('That seed was no magic bean.');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();

const db = require('../server/db/db')
const { User
  , Superpower
  , Review } = require('../server/db/models')


const superpowers = [{
  name: 'Lightning Speed',
  description: 'will make you fast as lightning',
  imageUrl: 'https://openclipart.org/download/257626/Lightning-Bolt-1.svg',
  stock: 4,
  tags: ['travel', 'speed', 'weather']
}, {
  name: 'X-Ray Vision',
  description: 'Allows you to see through walls!',
  imageUrl: 'https://s3.amazonaws.com/mno.products/36834/9cd315b2ee50f658c0186b51ddd95a6a.jpg',
  stock: 2,
  tags: ['vision', 'spying', 'creepy']
}, {
  name: 'Teleportation',
  description: 'Allows you to get from one place to the next in no time. Literally.',
  imageUrl: 'https://themerkle.com/wp-content/uploads/2017/02/shutterstock_324439487.jpg',
  stock: 10,
  tags: ['travel', 'speed']
}, {
  name: 'Invisibility',
  description: 'Not everyone wants to be seen.',
  imageUrl: 'https://wtvox.com/wp-content/uploads/2016/03/invisibility-is-now-possible.jpg',
  stock: 3,
  tags: ['travel', 'privacy', 'spying', 'creepy', 'transformation']
}, {
  name: 'Shapeshifting',
  description: 'You can be whatever you want!',
  imageUrl: 'https://vignette.wikia.nocookie.net/powerlisting/images/0/0b/Xmen-mystique-by-kev-walker.png/revision/latest?cb=20101001173250',
  stock: 7,
  tags: ['transformation', 'travel']
}, {
  name: 'Time Travel',
  description: 'Travel to another era, past or future.',
  imageUrl: 'https://cdn.images.express.co.uk/img/dynamic/151/590x/time-707642.jpg',
  stock: 5,
  tags: ['travel', 'history', 'spying']
}]

const users = [{
  firstName: 'Sarah',
  lastName: 'Laine',
  email: 'sarah@gmail.com',
  password: '123',
  mailingAddress: '123 Hello Lane',
  billingAddress: '123 Hello Lane',
  phone: 1234445555
}, {
  firstName: 'Connor',
  lastName: 'Kirkwood',
  email: 'connor@gmail.com',
  password: '123',
  mailingAddress: '123 Fullstack Ave',
  billingAddress: '123 Fullstack Ave',
  phone: 1234442233
}, {
  firstName: 'Sunny',
  lastName: 'Kim',
  email: 'sunny@gmail.com',
  password: '123',
  mailingAddress: '5 Hanover Court',
  billingAddress: '5 Hanover Court',
  phone: 1239586934
}, {
  firstName: 'Luis',
  lastName: 'Rincon',
  email: 'luis@gmail.com',
  password: '123',
  mailingAddress: '44 Review Drive',
  billingAddress: '44 Review Drive',
  phone: 1239907788
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

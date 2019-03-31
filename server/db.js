const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL, { logging: false });

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    unique: { msg: 'User name must be unique' },
    allowNull: false,
    validate: {
      notEmpty: { msg: "Name field can't be empty" },
    },
  },
  bio: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {msg: "Bio field can't be empty"},
    },
  },
  rank: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {msg: "Rank field can't be empty"},
    },
  },
});

const syncAndSeed = () => {
  return db
    .sync({ force: true })
    .then(() => {
      Promise.all([
        User.create({
          name: 'Murray',
          bio: "He's a cat. He likes sleeping and eating.",
          rank: 2,
        }),
        User.create({
          name: 'Sophia',
          bio: "She's a cat. She likes eating and sleeping.",
          rank: 3,
        }),
        User.create({
          name: 'Alex',
          bio: "He's human, and he likes cats.",
          rank: 1,
        }),
      ]);
    })
    .then(() => console.log('Databse synced and seeded!'))
    .catch(err => console.error(err));
};

module.exports = { User, syncAndSeed };

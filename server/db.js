const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL, { logging: false });

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validation: {
      notEmpty: true,
    },
  },
  bio: {
    type: Sequelize.TEXT,
    allowNull: false,
    validation: {
      notEmpty: true,
    },
  },
  rank: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validation: {
      notEmpty: true,
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

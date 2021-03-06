const express = require('express');
const path = require('path');
const { User } = require('./db');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'src', 'index.html'));
});

app.get('/api/users', (req, res, next) => {
  User.findAll({
    order: [['rank', 'ASC']],
  })
    .then(users => res.send(users))
    .catch(next);
});

app.put('/api/users/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(product => product.update(req.body))
    .then(() => res.sendStatus(201))
    .catch(next);
});

app.post('/api/users/create', (req, res, next) => {
  User.create(req.body)
    .then(() => res.sendStatus(201))
    .catch(next);
});

app.delete('/api/users/:id', (req, res, next) => {
  User.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(204))
    .catch(next);
});

//handle 404
app.use((req, res, next) => {
  const err = new Error('Not Found!');
  err.status = 404;
  next(err);
});

//error catching endware
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500);
  res.send(err.message || 'Internet server error!');
});

module.exports = app;

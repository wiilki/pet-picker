const express = require('express');
const usersRouter = require('');

const app = express();

app.use('/api/users', usersRouter);

app.get('/api', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.listen(3000, () => {
  console.log('API server listening on port 3000');
});

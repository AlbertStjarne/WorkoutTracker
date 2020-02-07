const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

// load env vars config file
dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/', (req, res) => res.json({ msg: 'Welcome to the everyrep API' }));

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/workouts', require('./routes/workouts'));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverless = require('serverless-http');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
const PORT = process.env.PORT || 8000;

const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

//  ROUTES
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/cart', cartRoutes);

// app.all("*", (req, res, next) => {
//   res.status(404).json({
//     status: "fail",
//     message: `Can't find ${req.originalUrl} on the server`,
//   });
// });

// Handling Unhandled Routes
app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('Database Connection Successfully..');
  })
  .catch((err) => {
    console.log('Database Connection Failed');
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

module.exports.handler = serverless(app);

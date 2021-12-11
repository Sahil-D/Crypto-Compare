const express = require('express');
const app = express();
const mongoose = require('mongoose');

// const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const httpStatus = require('http-status');
const morganMiddleware = require('./middlewares/morgan');

const ErrorMessages = require('./utils/ErrorMessages');
const ApiError = require('./utils/ApiError');

const userRoute = require('./routes/user');
const historyRoute = require('./routes/history');

const PORT = process.env.PORT || 8080;

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () => {
  console.log('MongoDB is connected');
});

app.use(cors());
// middleware like body parser
app.use(express.json());
app.use(helmet());
app.use(morganMiddleware);

app.use('/api/user', userRoute);
app.use('/api/history', historyRoute);

initErrorHandlers(app);

app.listen(PORT, () => {
  console.log('Server running at PORT : ', PORT);
});

function initErrorHandlers(app) {
  // 404 Error Handler
  app.use(function (req, res, next) {
    return res.status(404).send({ status: 'failure', error: 'Not Found' });
  });

  // General Error Handler
  app.use((error, req, res, next) => {
    console.log(error);
    if (error instanceof ApiError) {
      const statusCode = error.statusCode;
      let message = error.message;

      if (error.statusCode >= httpStatus.INTERNAL_SERVER_ERROR) {
        message = ErrorMessages.INTERNAL_SERVER_ERROR;
      }

      return res.status(statusCode).send({ status: 'failure', error: message });
    }

    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ status: 'failure', error: ErrorMessages.INTERNAL_SERVER_ERROR });
  });
}

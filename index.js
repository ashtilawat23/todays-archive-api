const express = require('express');
const helmet = require('helmet');

// router 
const eventRouter = require('./eventRouter');
const indexRouter = require('./indexRouter');


const app = express();

// error handling
process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

// helmet
app.use(helmet());

// application
app.use('/', indexRouter);
app.use(['/event','/events'], eventRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    if (err instanceof createError.HttpError) {
      res.locals.message = err.message;
      res.locals.status = err.statusCode;
      if (process.env.NODE_ENV === 'development') {
        res.locals.error = err;
      }
    }
    console.error(err);
    if (process.env.NODE_ENV === 'production' && !res.locals.message) {
      res.locals.message = 'ApplicationError';
      res.locals.status = 500;
    }
    if (res.locals.status) {
      res.status(res.locals.status);
      const errObject = { error: res.locals.error, message: res.locals.message };
      return res.json(errObject);
    }
    next(err);
});

app.listen(8000, () => console.log('API is listening on port 8000...'));
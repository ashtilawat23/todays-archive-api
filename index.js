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

app.listen(8000, () => console.log('API is listening on port 8000...'));
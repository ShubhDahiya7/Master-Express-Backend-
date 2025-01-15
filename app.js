const express = require('express');
const { json } = require('stream/consumers');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// create an express App
const app = express();

// middleware - it comes b/w req and res, something through which our req's goes through.
// A series of middleware is called middlware stack
app.use(express.json());

// 3rd party middleware called morgan
// It is often used with Express to log details about incoming requests to the server,
// which can be useful for debugging and monitoring purposes
app.use(morgan('dev'));

// creating our own middleware- All middlewares are defined in the req-res cycle only if they are defined
// before the res is send back to the client.
// all functions together are called middleware stack that we call before the final res
// next - it is used to call the next middleware once that current middleware has been executed in the
// req-res cycle.
// calling the next() in the middleware stack is necessary to comp the req-res cycle.

app.use((req, res, next) => {
  // we will see the below line in the terminal.
  console.log('hello from the middleware');
  next();
});

// serving static files: Now if we want to see files present in our public folder, they won't appear
// if we give their url in browser, means client can't access it bcz there is no route defined for those url's.
// But we can use a middleware to see those files content.
// Not of much use but just a concept
app.use(express.static('./public'));

// if we need the the time at which the req is made
// middlewares are always called in the series in which they are written in code top to btm.
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

// Mounting - lets use unique router for specific kinda of routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

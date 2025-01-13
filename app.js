const express = require('express');
const fs = require('fs');
const { json } = require('stream/consumers');
const app = express();

const port = 3000;

// middleware - it comes b/w req and res, something through which our req's
// goes through.
app.use(express.json());

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

// if we need the the time at which the req is made
// middlewares are always called in the series in which they are written in code top to btm.
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

// // routing
// app.get('/', (req, res) => {
//   res.status(200).send('hello from server side');
// });

// store the local data in tours
// parsing is used to convert the json string into object so that we can manipulate it
// tours is an array of objects
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

// Api endpt for the get req and the callback func is called route handler.
// In which we are sending the json content.
// api: This part indicates that the endpoint is part of the API. It helps differentiate
// API routes from other types of routes, such as those serving static files
// v1 is the version no of api, we can make multiple versions of a api at a time.

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: tours,
  });
});

app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const tour = Object.assign({ id: newId }, req.body);
  // push tour in tours array
  tours.push(tour);
  // write the file - after the file is succesfully written a callback func is called in which
  // we send the res back to the client about this post req made.
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: tour,
      });
    }
  );
});

// Listen to incoming req on this port no
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});

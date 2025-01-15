const fs = require('fs');

// Load and parse the tours data
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

// param middleware - A middleware that runs only if certain parameter like id is included in the api endpt
// while make a req to the server.
// takes 4 args : where val is the value of that parameter

exports.checkID = (req, res, next, val) => {
  console.log(`tour id is: ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  // next() middleware is called only if the id exist otherwise we return from above directly by sending a 404 response.
  next();
};

// Middleware before creating a new tour
// To check if it contains tour name and price property.
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'error',
      message: 'name or price missing',
    });
  }
  next();
};

// Route handler for getting all tours
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: tours,
  });
};

// Route handler for creating a new tour
exports.createTour = (req, res) => {
  console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const tour = Object.assign({ id: newId }, req.body);

  // Add the new tour to the tours array
  tours.push(tour);

  // Write the updated tours data back to the file
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Failed to save the tour',
        });
      }

      res.status(201).json({
        status: 'success',
        data: tour,
      });
    }
  );
};

// Route handler for getting a single tour by ID
exports.getTour = (req, res) => {
  // Convert ID from string to number
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);
  req.tour = tour; // Attach the found tour to the request object
  res.status(200).json({
    status: 'success',
    data: { tour: req.tour },
  });
};

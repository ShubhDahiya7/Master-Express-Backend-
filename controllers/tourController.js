const fs = require('fs');

// Load and parse the tours data
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

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

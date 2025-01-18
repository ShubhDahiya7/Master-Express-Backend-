const TourModel = require('../models/tourModel');

// Middleware before creating a new tour
// To check if it contains tour name and price property.

// Route handler for getting all tours
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: tours,
  });
};

// Route handler for creating a new tour
exports.createTour = async (req, res) => {
  try {
    // This is the 2nd method of creating a tour
    // before we were creating the document here in code itself
    // then saving it.
    // but if we will create the document in code itself then it will always
    // be same and the pt of post req to send diff tours data will be over.
    // That's why when we make a post req, we take the data(req.body) and save that
    // in newTour var, which then itself gets saved in our collection as a doc
    // in mongo db.
    const newTour = await TourModel.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch {
    res.status(400).json({
      status: 'fail',
      data: err,
    });
  }
};

// Route handler for getting a single tour by ID
exports.getTour = (req, res) => {
  // Convert ID from string to number
  const id = req.params.id * 1;
  // const tour = tours.find((tour) => tour.id === id);
  // req.tour = tour; // Attach the found tour to the request object
  // res.status(200).json({
  //   status: 'success',
  //   data: { tour: req.tour },
  // });
};

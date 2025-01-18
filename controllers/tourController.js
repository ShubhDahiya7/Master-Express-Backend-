const TourModel = require('../models/tourModel');

// Route handler for getting all tours
exports.getAllTours = async (req, res) => {
  const tours = await TourModel.find();

  res.status(200).json({
    status: 'success',
    totalTours: tours.length,
    data: tours,
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

    // this res is for the client to see what happenend and also
    // to comp req-res cycle.
    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch {
    res.status(400).json({
      status: 'fail',
      data: 'invalid data sent',
    });
  }
};

// To update a tour selected by id
exports.updateTour = async (req, res) => {
  const updatedTour = await TourModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'updated',
    data: updatedTour,
  });
};

// To delete a tour by id
exports.deleteTour = async (req, res) => {
  // In rest API while deleting something we dont store the results in a var.
  await TourModel.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    message: 'deleted',
    data: null,
  });
};

// Route handler for getting a single tour by ID
exports.getTour = async (req, res) => {
  const tour = await TourModel.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: tour,
  });
};

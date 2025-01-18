const express = require('express');
const tourController = require('../controllers/tourController');

const tourRouter = express.Router();

// Now this param middleware is only called if the req endpt is related to tours not users
// so now we can see how having diff routers is benefetial for diff kinds of api endpts.
// on diff kinda of routes we can add diff series of middlewares.
// tourRouter.param('id', tourController.checkID);

tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

tourRouter.route('/:id').get(tourController.getTour);
//   .patch(tourController.updateTour)
//   .delete(tourController.deleteTour);

module.exports = tourRouter;

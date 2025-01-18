const mongoose = require('mongoose');

// lets define schema using mongoose:
// A schema defines how our documents will look like in a collection.
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  rating: Number,
  price: {
    type: Number,
    required: true,
  },
});

// on the basis of above schema we will create a model
// Now a model is like a class in oops we can say, whose objects we can create
const TourModel = mongoose.model('TourModel', tourSchema);

module.exports = TourModel;

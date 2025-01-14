const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

// Routes for user-related actions
// The routeHandlers or the callback func's we can say they are defined in the controllers folder for diff http req.

// Destructuring {} - we can all use getAllUsers and other func's directly if we import the by destructuring method.

userRouter
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

userRouter
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;

const router = require('express').Router();
const {
  getCheckoutSession,
  getAllBooking,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking
} = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

router.use(authController.protect);

router.get('/checkout-session/:tourID', getCheckoutSession);

router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(getAllBooking)
  .post(createBooking);

router
  .route('/:id')
  .get(getBooking)
  .patch(updateBooking)
  .delete(deleteBooking);

module.exports = router;

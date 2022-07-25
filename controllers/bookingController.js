const stripe = require('stripe')(process.env.STRIPE_SECERT_KEY);

const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// const AppError = require('../utils/appError');

const getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently tour booked.
  const tour = await Tour.findById(req.params.tourID);
  //   const tour = await factory.getOne(Tour);
  //   if (!tour) next(new AppError('There is not tour with that id!', 400));

  // 2) Create checkout session.
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${
      req.params.tourID
    }&user=${req.user.id}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourID,
    line_items: [
      {
        name: tour.name,
        description: tour.summary,
        images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1
      }
    ]
  });

  // 3) Creaet session as response.
  res.status(200).json({
    status: 'successs',
    session
  });
});

const createBookingCheckout = catchAsync(async (req, res, next) => {
  const { tour, user, price } = req.query;

  if (!tour && !user && !price) return next();
  await Booking.create({ tour, user, price });
  res.redirect(req.originalUrl.split('?')[0]);
});

const getAllBooking = factory.getAll(Booking);
const createBooking = factory.createOne(Booking);
const getBooking = factory.getOne(Booking);
const updateBooking = factory.updateOne(Booking);
const deleteBooking = factory.deleteOne(Booking);

module.exports = {
  getCheckoutSession,
  createBookingCheckout,
  getAllBooking,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking
};

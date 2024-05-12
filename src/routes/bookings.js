import express from 'express';
import getBookings from '../services/bookings/getBookings.js';
import getBookingById from '../services/bookings/getBookingById.js';
import createBooking from '../services/bookings/createBooking.js';
import updateBookingById from '../services/bookings/updateBookingById.js';
import deleteBooking from '../services/bookings/deleteBooking.js';
import authMiddleware from '../middleware/auth.js';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';

const router = express.Router();

router.get('/', async (req, res) => {
	const { userId } = req.query;
	const bookings = await getBookings(userId);
	res.status(200).json(bookings);
});

router.post('/', authMiddleware, async (req, res, next) => {
	try {
		const {
			userId,
			propertyId,
			checkinDate,
			checkoutDate,
			numberOfGuests,
			totalPrice,
			bookingStatus,
		} = req.body;
		const newBooking = await createBooking(
			userId,
			propertyId,
			checkinDate,
			checkoutDate,
			numberOfGuests,
			totalPrice,
			bookingStatus
		);

		if (newBooking === null) {
			res.status(400).send('Something went wrong while creating a new booking');
		} else {
			res.status(201).json(newBooking);
		}
	} catch (error) {
		next(error);
	}
});

router.get(
	'/:id',
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const booking = await getBookingById(id);
			if (!booking) {
				res.status(404).json({ message: `Booking with id ${id} not found` });
			} else {
				res.status(200).json(booking);
			}
		} catch (error) {
			next(error);
		}
	},
	notFoundErrorHandler
);

router.put('/:id', authMiddleware, async (req, res, next) => {
	const { id } = req.params;
	const {
		userId,
		propertyId,
		checkinDate,
		checkoutDate,
		numberOfGuests,
		totalPrice,
		bookingStatus,
	} = req.body;

	try {
		const updatedBooking = await updateBookingById(
			id,
			userId,
			propertyId,
			checkinDate,
			checkoutDate,
			numberOfGuests,
			totalPrice,
			bookingStatus
		);
		res.status(200).json(updatedBooking);
	} catch (error) {
		if (error) {
			res.status(404).json({ error: error.message });
		} else {
			console.error('Error in updateBookingById:', error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
		next(error);
	}
	notFoundErrorHandler();
});

router.delete(
	'/:id',
	authMiddleware,
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const deletedBookingId = await deleteBooking(id);
			if (deletedBookingId) {
				res.status(200).json({
					message: `Booking with id ${id} was succesfully deleted!`,
					deletedBookingId,
				});
			} else {
				res.status(404).json({
					message: `Booking with id ${id} not found`,
				});
			}
		} catch (error) {
			next(error);
		}
	},
	notFoundErrorHandler
);

export default router;

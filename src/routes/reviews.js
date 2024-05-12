import express from 'express';
import getReviews from '../services/reviews/getReviews.js';
import getReviewById from '../services/reviews/getReviewById.js';
import createReview from '../services/reviews/createReview.js';
import updateReviewById from '../services/reviews/updateReviewById.js';
import deleteReview from '../services/reviews/deleteReview.js';
import authMiddleware from '../middleware/auth.js';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';

const router = express.Router();

router.get('/', async (req, res) => {
	const reviews = await getReviews();
	res.status(200).json(reviews);
});

router.post('/', authMiddleware, async (req, res, next) => {
	try {
		const { userId, propertyId, rating, comment } = req.body;
		const newReview = await createReview(userId, propertyId, rating, comment);
		if (newReview === null) {
			res.status(400).send('Something went wrong while creating a review');
		} else {
			res.status(201).json(newReview);
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
			const review = await getReviewById(id);
			if (!review) {
				res.status(404).json({ message: `Review with id ${id} not found` });
			} else {
				res.status(200).json(review);
			}
		} catch (error) {
			next(error);
		}
	},
	notFoundErrorHandler
);

router.put('/:id', authMiddleware, async (req, res, next) => {
	const { id } = req.params;
	const { userId, propertyId, rating, comment } = req.body;

	try {
		const updatedReview = await updateReviewById(
			id,
			userId,
			propertyId,
			rating,
			comment
		);
		res.status(200).json(updatedReview);
	} catch (error) {
		if (error) {
			res.status(404).json({ error: error.message });
		} else {
			console.error('Error in updateReviewById:', error);
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
			const deletedReviewId = await deleteReview(id);
			if (deletedReviewId) {
				res.status(200).json({
					message: `Review with id ${id} was succesfully deleted!`,
					deletedReviewId,
				});
			} else {
				res.status(404).json({
					message: `Review with id ${id} not found`,
				});
			}
		} catch (error) {
			next(error);
		}
	},
	notFoundErrorHandler
);

export default router;

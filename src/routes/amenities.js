import express from 'express';
import getAmenities from '../services/amenities/getAmenities.js';
import getAmenityById from '../services/amenities/getAmenityById.js';
import createAmenity from '../services/amenities/createAmenity.js';
import updateAmenityById from '../services/amenities/updateAmenityById.js';
import deleteAmenity from '../services/amenities/deleteAmenity.js';
import authMiddleware from '../middleware/auth.js';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';

const router = express.Router();

router.get('/', async (req, res) => {
	const { name } = req.query;
	const amenities = await getAmenities(name);
	res.status(200).json(amenities);
});

router.post('/', authMiddleware, async (req, res, next) => {
	try {
		const { name } = req.body;
		const newAmenity = await createAmenity(name);

		if (newAmenity === null) {
			res.status(400).send('Something went wrong while creating a new amenity');
		} else {
			res.status(201).json(newAmenity);
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
			const amenity = await getAmenityById(id);
			if (!amenity) {
				res.status(404).json({ message: `Amenity with id ${id} not found` });
			} else {
				res.status(200).json(amenity);
			}
		} catch (error) {
			next(error);
		}
	},
	notFoundErrorHandler
);

router.put('/:id', authMiddleware, async (req, res, next) => {
	const { id } = req.params;
	const { name } = req.body;

	try {
		const updatedAmenity = await updateAmenityById(id, name);
		res.status(200).json(updatedAmenity);
	} catch (error) {
		if (error) {
			res.status(404).json({ error: `Amenity with id ${id} not found.` });
		} else {
			console.error(error);
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
			const deletedAmenityId = await deleteAmenity(id);
			if (deletedAmenityId) {
				res.status(200).json({
					message: `Amenity with id ${id} was succesfully deleted!`,
					deletedAmenityId,
				});
			} else {
				res.status(404).json({
					message: `Amenity with id ${id} not found`,
				});
			}
		} catch (error) {
			next(error);
		}
	},
	notFoundErrorHandler
);

export default router;

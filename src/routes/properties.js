import express from 'express';
import getProperties from '../services/properties/getProperties.js';
import getPropertyById from '../services/properties/getPropertyById.js';
import createProperty from '../services/properties/createProperty.js';
import updatePropertyById from '../services/properties/updatePropertyById.js';
import deleteProperty from '../services/properties/deleteProperty.js';
import authMiddleware from '../middleware/auth.js';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';

const router = express.Router();

router.get('/', async (req, res) => {
	const { pricePerNight, location } = req.query;
	const properties = await getProperties(pricePerNight, location);
	res.status(200).json(properties);
});

router.post('/', authMiddleware, async (req, res, next) => {
	try {
		const {
			title,
			description,
			location,
			pricePerNight,
			bedroomCount,
			bathRoomCount,
			maxGuestCount,
			hostId,
			rating,
		} = req.body;
		const newProperty = await createProperty(
			title,
			description,
			location,
			pricePerNight,
			bedroomCount,
			bathRoomCount,
			maxGuestCount,
			hostId,
			rating
		);
		if (newProperty === null) {
			res.status(400).send('Something went wrong while creating a property');
		} else {
			res.status(201).json(newProperty);
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
			const property = await getPropertyById(id);
			if (!property) {
				res.status(404).json({ message: `Property with id ${id} not found` });
			} else {
				res.status(200).json(property);
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
		title,
		description,
		location,
		pricePerNight,
		bedroomCount,
		bathRoomCount,
		maxGuestCount,
		hostId,
		rating,
	} = req.body;

	try {
		const updatedProperty = await updatePropertyById(
			id,
			title,
			description,
			location,
			pricePerNight,
			bedroomCount,
			bathRoomCount,
			maxGuestCount,
			hostId,
			rating
		);
		res.status(200).json(updatedProperty);
	} catch (error) {
		if (error) {
			res.status(404).json({ error: error.message });
		} else {
			console.error('Error in updatePropertyById:', error);
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
			const deletedPropertyId = await deleteProperty(id);
			if (deletedPropertyId) {
				res.status(200).json({
					message: `Property with id ${id} was succesfully deleted!`,
					deletedPropertyId,
				});
			} else {
				res.status(404).json({
					message: `Property with id ${id} not found`,
				});
			}
		} catch (error) {
			next(error);
		}
	},
	notFoundErrorHandler
);

export default router;

import express from 'express';
import getHosts from '../services/hosts/getHosts.js';
import getHostById from '../services/hosts/getHostById.js';
import createHost from '../services/hosts/createHost.js';
import updateHostById from '../services/hosts/updateHostById.js';
import deleteHost from '../services/hosts/deleteHost.js';
import authMiddleware from '../middleware/auth.js';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';

const router = express.Router();

router.get('/', async (req, res) => {
	const hosts = await getHosts();
	res.status(200).json(hosts);
});

router.post('/', authMiddleware, async (req, res, next) => {
	try {
		const {
			username,
			password,
			name,
			email,
			phoneNumber,
			profilePicture,
			aboutMe,
		} = req.body;
		const newHost = await createHost(
			username,
			password,
			name,
			email,
			phoneNumber,
			profilePicture,
			aboutMe
		);
		if (newHost === null) {
			res.status(400).send('Something went wrong while creating a host');
		} else {
			res.status(201).json(newHost);
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
			const host = await getHostById(id);
			if (!host) {
				res.status(404).json({ message: `Host with id ${id} not found` });
			} else {
				res.status(200).json(host);
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
		username,
		password,
		name,
		email,
		phoneNumber,
		profilePicture,
		aboutMe,
	} = req.body;

	try {
		const updatedHost = await updateHostById(
			id,
			username,
			password,
			name,
			email,
			phoneNumber,
			profilePicture,
			aboutMe
		);
		res.status(200).json(updatedHost);
	} catch (error) {
		if (error) {
			res.status(404).json({ error: error.message });
		} else {
			console.error('Error in updateHostById:', error);
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
			const deletedHostId = await deleteHost(id);
			if (deletedHostId) {
				res.status(200).json({
					message: `Host with id ${id} was succesfully deleted!`,
					deletedHostId,
				});
			} else {
				res.status(404).json({
					message: `Host with id ${id} not found`,
				});
			}
		} catch (error) {
			next(error);
		}
	},
	notFoundErrorHandler
);

export default router;

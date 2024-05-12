import express from 'express';
import getUsers from '../services/users/getUsers.js';
import getUserById from '../services/users/getUserById.js';
import createUser from '../services/users/createUser.js';
import updateUserById from '../services/users/updateUserById.js';
import deleteUser from '../services/users/deleteUser.js';
import authMiddleware from '../middleware/auth.js';
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';

const router = express.Router();

router.get('/', async (req, res) => {
	const users = await getUsers();
	res.status(200).json(users);
});

router.post(
	'/',
	authMiddleware,
	async (req, res, next) => {
		try {
			const { username, password, name, email, phoneNumber, profilePicture } =
				req.body;
			const newUser = await createUser(
				username,
				password,
				name,
				email,
				phoneNumber,
				profilePicture
			);
			if (newUser === null) {
				res.status(400).send('Something went wrong while creating a user');
			} else {
				res.status(201).json(newUser);
			}
		} catch (error) {
			next(error);
		}
	},
	notFoundErrorHandler
);

router.get(
	'/:id',
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const user = await getUserById(id);
			if (!user) {
				res.status(404).json({ message: `User with id ${id} not found` });
			} else {
				res.status(200).json(user);
			}
		} catch (error) {
			next(error);
		}
	},
	notFoundErrorHandler
);

router.put('/:id', authMiddleware, async (req, res, next) => {
	try {
		const { id } = req.params;
		const { username, password, name, email, phoneNumber, profilePicture } =
			req.body;

		const updatedUser = await updateUserById(
			id,
			username,
			password,
			name,
			email,
			phoneNumber,
			profilePicture
		);
		res.status(200).json(updatedUser);
	} catch (error) {
		if (error) {
			res.status(404).json({ error: error.message });
		} else {
			console.error('Error in updateUserById:', error);
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
			const deletedUser = await deleteUser(id);
			if (deletedUser) {
				res.status(200).json({
					message: `User with id ${id} was succesfully deleted!`,
					deletedUser,
				});
			} else {
				res.status(404).json({
					message: `User with id ${id} not found`,
				});
			}
		} catch (error) {
			next(error);
		}
	},
	notFoundErrorHandler
);

export default router;

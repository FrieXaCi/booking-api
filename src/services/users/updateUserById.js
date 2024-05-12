import { PrismaClient } from '@prisma/client';
import NotFoundError from '../../errors/NotFoundError.js';

const updateUserById = async (
	id,
	username,
	password,
	name,
	email,
	phoneNumber,
	profilePicture
) => {
	const prisma = new PrismaClient();
	const updatedUser = await prisma.user.updateMany({
		where: {
			id,
		},
		data: {
			username,
			password,
			name,
			email,
			phoneNumber,
			profilePicture,
		},
	});
	if (updatedUser.count > 0) {
		return {
			message: `Review with id ${id} was updated!`,
		};
	} else {
		throw new NotFoundError('Review', id);
	}
};

export default updateUserById;

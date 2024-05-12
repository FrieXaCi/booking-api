import { PrismaClient } from '@prisma/client';

const createUser = async (
	username,
	password,
	name,
	email,
	phoneNumber,
	profilePicture
) => {
	try {
		const prisma = new PrismaClient();
		return await prisma.user.create({
			data: {
				username,
				password,
				name,
				email,
				phoneNumber,
				profilePicture,
			},
		});
	} catch (error) {
		console.error('Something went wrong while creating user:', error);
		return null;
	}
};

export default createUser;

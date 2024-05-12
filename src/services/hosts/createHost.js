import { PrismaClient } from '@prisma/client';

const createHost = async (
	username,
	password,
	name,
	email,
	phoneNumber,
	profilePicture,
	aboutMe
) => {
	try {
		const prisma = new PrismaClient();
		return await prisma.host.create({
			data: {
				username,
				password,
				name,
				email,
				phoneNumber,
				profilePicture,
				aboutMe,
			},
		});
	} catch (error) {
		console.error('Something went wrong while creating host:', error);
		return null;
	}
};

export default createHost;

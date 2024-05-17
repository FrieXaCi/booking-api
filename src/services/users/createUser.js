import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

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
		const hashedPassword = await bcrypt.hash(password, 10);

		return await prisma.user.create({
			data: {
				username,
				password: hashedPassword,
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

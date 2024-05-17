import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const getUserById = async (id) => {
	const prisma = new PrismaClient();
	const user = await prisma.user.findUnique({
		where: {
			id,
		},
	});

	if (user && user.password) {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		user.password = hashedPassword;
	}

	return user;
};

export default getUserById;

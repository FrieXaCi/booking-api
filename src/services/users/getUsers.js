import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const getUsers = async (email, username) => {
	const prisma = new PrismaClient();

	const users = await prisma.user.findMany({
		where: { email, username },
	});

	users.forEach((user) => {
		user.password = bcrypt.hashSync(user.password, 10);
	});

	await prisma.$disconnect();
	return users;
};

export default getUsers;

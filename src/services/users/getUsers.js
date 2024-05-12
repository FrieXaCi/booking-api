import { PrismaClient } from '@prisma/client';

const getUsers = async () => {
	const prisma = new PrismaClient();

	return prisma.user.findMany();
};

export default getUsers;

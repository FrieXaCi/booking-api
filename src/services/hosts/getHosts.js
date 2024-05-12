import { PrismaClient } from '@prisma/client';

const getHosts = async () => {
	const prisma = new PrismaClient();

	return prisma.host.findMany();
};

export default getHosts;

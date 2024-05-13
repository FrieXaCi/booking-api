import { PrismaClient } from '@prisma/client';

const getHosts = async (name) => {
	const prisma = new PrismaClient();

	return prisma.host.findMany({
		where: { name },
	});
};

export default getHosts;

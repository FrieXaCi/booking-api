import { PrismaClient } from '@prisma/client';

const deleteHost = async (id) => {
	const prisma = new PrismaClient();

	const deletedHost = await prisma.host.deleteMany({
		where: {
			id,
		},
	});
	await prisma.$disconnect();

	if (deletedHost.count > 0) {
		return {
			message: `Host with id ${id} was deleted!`,
		};
	} else {
		return null;
	}
};

export default deleteHost;

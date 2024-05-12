import { PrismaClient } from '@prisma/client';

const getBookings = async (userId) => {
	const prisma = new PrismaClient();

	return prisma.booking.findMany({
		where: {
			userId,
		},
	});
};

export default getBookings;

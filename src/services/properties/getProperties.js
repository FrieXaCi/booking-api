import { PrismaClient } from '@prisma/client';

const getProperties = async (pricePerNight, location) => {
	const prisma = new PrismaClient();
	return prisma.property.findMany({
		where: {
			location: {
				contains: location,
			},
			pricePerNight,
		},
		include: {
			amenities: true,
		},
	});
};

export default getProperties;

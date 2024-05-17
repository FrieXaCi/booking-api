import { PrismaClient } from '@prisma/client';

const getProperties = async (pricePerNight, location) => {
	const prisma = new PrismaClient();
	return prisma.property.findMany({
		where: {
			...(pricePerNight && location
				? {
						location: { contains: location },
						pricePerNight: parseFloat(pricePerNight),
				  }
				: {}),
		},
		include: {
			amenities: true,
		},
	});
};

export default getProperties;

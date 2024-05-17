import { PrismaClient } from '@prisma/client';

const getPropertyById = async (id) => {
	const prisma = new PrismaClient();
	const property = await prisma.property.findUnique({
		where: {
			id,
		},
		include: {
			amenities: true,
		},
	});

	return property;
};

export default getPropertyById;

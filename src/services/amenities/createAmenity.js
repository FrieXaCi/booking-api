import { PrismaClient } from '@prisma/client';

const createAmenity = async (name) => {
	const prisma = new PrismaClient();
	try {
		return await prisma.amenity.create({
			data: {
				name,
			},
		});
	} catch (error) {
		console.error('Something went wrong while creating amenity:', error);
		return null;
	}
};

export default createAmenity;

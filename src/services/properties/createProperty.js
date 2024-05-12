import { PrismaClient } from '@prisma/client';

const createProperty = async (
	title,
	description,
	location,
	pricePerNight,
	bedroomCount,
	bathRoomCount,
	maxGuestCount,
	hostId,
	rating
) => {
	try {
		const prisma = new PrismaClient();
		return await prisma.property.create({
			data: {
				title,
				description,
				location,
				pricePerNight,
				bedroomCount,
				bathRoomCount,
				maxGuestCount,
				hostId,
				rating,
			},
		});
	} catch (error) {
		console.error('Something went wrong while creating property:', error);
		return null;
	}
};

export default createProperty;

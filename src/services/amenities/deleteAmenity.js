import { PrismaClient } from '@prisma/client';

const deleteAmenity = async (id) => {
	const prisma = new PrismaClient();

	const deletedAmenity = await prisma.amenity.deleteMany({
		where: {
			id,
		},
	});
	//await prisma.$disconnect();

	if (deletedAmenity.count > 0) {
		return {
			message: `Amenity with id ${id} was deleted!`,
		};
	} else {
		return null;
	}
};

export default deleteAmenity;

import { PrismaClient } from '@prisma/client';

const deleteProperty = async (id) => {
	const prisma = new PrismaClient();

	const deletedProperty = await prisma.property.deleteMany({
		where: {
			id,
		},
	});
	//await prisma.$disconnect();

	if (deletedProperty.count > 0) {
		return {
			message: `Property with id ${id} was deleted!`,
		};
	} else {
		return null;
	}
};

export default deleteProperty;

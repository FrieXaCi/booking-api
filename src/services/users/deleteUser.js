import { PrismaClient } from '@prisma/client';

const deleteUser = async (id) => {
	const prisma = new PrismaClient();

	const deletedUser = await prisma.user.deleteMany({
		where: {
			id,
		},
	});
	await prisma.$disconnect();

	if (deletedUser.count > 0) {
		return {
			message: `User with id ${id} was deleted!`,
		};
	} else {
		return null;
	}
};

export default deleteUser;

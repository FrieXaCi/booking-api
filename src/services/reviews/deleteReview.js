import { PrismaClient } from '@prisma/client';

const deleteReview = async (id) => {
	const prisma = new PrismaClient();

	const deletedReview = await prisma.review.deleteMany({
		where: {
			id,
		},
	});
	//await prisma.$disconnect();

	if (deletedReview.count > 0) {
		return {
			message: `Review with id ${id} was deleted!`,
		};
	} else {
		return null;
	}
};

export default deleteReview;

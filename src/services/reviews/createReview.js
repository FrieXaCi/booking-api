import { PrismaClient } from '@prisma/client';

const createReview = async (userId, propertyId, rating, comment) => {
	try {
		const prisma = new PrismaClient();
		return await prisma.review.create({
			data: {
				userId,
				propertyId,
				rating,
				comment,
			},
		});
	} catch (error) {
		console.error('Something went wrong while creating review:', error);
		return null;
	}
};

export default createReview;

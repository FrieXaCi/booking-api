import { PrismaClient } from '@prisma/client';

const deleteBooking = async (id) => {
	const prisma = new PrismaClient();

	const deletedBooking = await prisma.booking.deleteMany({
		where: {
			id,
		},
	});
	await prisma.$disconnect();

	if (deletedBooking.count > 0) {
		return {
			message: `Booking with id ${id} was deleted!`,
		};
	} else {
		return null;
	}
};

export default deleteBooking;

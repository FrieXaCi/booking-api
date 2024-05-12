import { PrismaClient } from '@prisma/client';

const createBooking = async (
	userId,
	propertyId,
	checkinDate,
	checkoutDate,
	numberOfGuests,
	totalPrice,
	bookingStatus
) => {
	const prisma = new PrismaClient();
	try {
		return await prisma.booking.create({
			data: {
				userId,
				propertyId,
				checkinDate,
				checkoutDate,
				numberOfGuests,
				totalPrice,
				bookingStatus,
			},
		});
	} catch (error) {
		console.error('Something went wrong while creating booking:', error);
		return null;
	}
};

export default createBooking;

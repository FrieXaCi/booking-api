class NotFoundError extends Error {
	constructor(recourseType, id) {
		super(`${recourseType} with id ${id} was not found!`);
		this.name = 'NotFoundError';
	}
}

export default NotFoundError;

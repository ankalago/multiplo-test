import { GenericError } from './GenericError'

export class NotFoundError extends GenericError {
	status: number
	constructor(message: string, args: unknown, status: number = 404) {
		super(message, args)
		this.status = status
	}
}

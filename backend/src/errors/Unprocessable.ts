import { GenericError } from './GenericError'

export class UnprocessableError extends GenericError {
	status: number
	constructor(message: string, args: unknown, status: number = 422) {
		super(message, args)
		this.status = status
	}
}

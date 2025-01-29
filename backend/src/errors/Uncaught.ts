import { GenericError } from './GenericError'

export class UnCaughtError extends GenericError {
	status: number

	constructor(message: string, args: unknown, status: number = 500) {
		super(message, args)
		this.status = status
	}
}

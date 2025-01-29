export abstract class GenericError extends Error {
	args: unknown
	protected constructor(message?: string, args?: unknown) {
		super(message)
		this.args = args
	}
}

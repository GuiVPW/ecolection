export class UnableError extends Error {
	constructor(name: string) {
		super(`Unable to create ${name}.`)
		this.name = 'UnableError'
	}
}

export class UserDto {
	id
	name
	email
	isVerified

	constructor(model: any) {
		this.id = model.id
		this.name = model.name
		this.email = model.email
		this.isVerified = model.is_verified
	}
}

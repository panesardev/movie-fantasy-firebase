export class User {
	uid: string;
	photoURL: string;
	email: string;
	displayName: string;
	// custom data
	type: number;
}

export class LoginUser {
	email: string;
	password: string;
}

export class SignupUser extends LoginUser {
	displayName: string;
}
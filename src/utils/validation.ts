interface Pattern {
	username: RegExp,
	email: RegExp,
	password: RegExp
}

const patterns: Pattern = {
	username: /^[a-z][\w-]{2,15}[a-z\d]$/,
	email: /(.)+/,
	password: /(.)+/
}

const validate = (type: 'username' | 'email' | 'password', input: string) : boolean => {
	return patterns[type].test(input);
}

export { validate }
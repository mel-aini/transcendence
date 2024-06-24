interface Pattern {
	username: RegExp,
	email: RegExp,
	password: RegExp
}

const patterns: Pattern = {
	username: /^[a-z][\w-]{2,15}[a-z\d]$/,
	email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
}

const validate = (type: 'username' | 'email' | 'password', input: string) : boolean => {
	return patterns[type].test(input);
}

export { validate }
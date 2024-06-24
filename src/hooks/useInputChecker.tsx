import { useReducer } from "react";
import { validate } from "../utils/validation";

interface TACTIONS {
	SET_ERROR: "setError",
	SET_DEFAULT: "setDefault"
}

const ACTIONS: TACTIONS = {
	SET_ERROR: "setError",
	SET_DEFAULT: "setDefault"
}

type TInputType = "username" | "email" | "password" | "retype_password";
type Types = 'username' | 'email' | 'password' | 'retype_password';

export interface IInputState {
	type: TInputType,
	isError: boolean,
	error: string
}

const inputsState: IInputState[] = [
	{
		type: "username",
		isError: false,
		error: ""
	},
	{
		type: "email",
		isError: false,
		error: ""
	},
	{
		type: "password",
		isError: false,
		error: ""
	},
	{
		type: "retype_password",
		isError: false,
		error: ""
	}
]


const reducer = (state: any, action: any) => {
	switch (action.type) {
		case ACTIONS.SET_ERROR:
			return state.map((elem: any) => {
				if (elem.type == action.payload.type) {
					return {
						...elem,
						isError: true,
						error: action.payload.error
					}
				}
				return elem
			})
		case ACTIONS.SET_DEFAULT:
			return state.map((elem: any) => {
				if (elem.type == action.payload.type) {
					return {
						...elem,
						isError: false,
						error: ""
					}
				}
				return elem
			})
		default:
			return state
	}
}

type ReturnType = [IInputState[], (type: Types, value: string, compare?: string) => void, (data: Object, type: string) => void]

const useInputChecker = (url: string): ReturnType => {
	const [state, dispatch] = useReducer(reducer, inputsState);

	const makeRequest = (data: Object, type: string) => {
		
		fetch(url, {
			method: 'Post',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data)
		})
		.then(async (response) => {
			if (!response.ok) {
				const error = await response.json();
				throw error;
			}
			return response.json();
		})
		.then((body) => {
			dispatch({ type: ACTIONS.SET_DEFAULT, payload: { type: type } });
		})
		.catch((error) => {
			console.log(error);
			let errorMsg: string;
			if (error.error.message[type]) {
				errorMsg = error.error.message[type];
				
				dispatch({ type: ACTIONS.SET_ERROR, payload: { type: type, error: errorMsg } });
			} else {
				dispatch({ type: ACTIONS.SET_DEFAULT, payload: { type: type } });
			}

		})
	}

	const parseInput = (type: Types, value: string, compare?: string) => {
		if (type == 'retype_password') {
			// confirm password
			if (value == '')
				dispatch({ type: ACTIONS.SET_ERROR, payload: { type: type, error: 'empty field' } });
			else if (value != compare)
				dispatch({ type: ACTIONS.SET_ERROR, payload: { type: type, error: 'passwords don\'t match' } });
			else
				dispatch({ type: ACTIONS.SET_DEFAULT, payload: { type: type } });
		} else {
			if (validate(type, value)) {
				console.log('valid input');
				dispatch({ type: ACTIONS.SET_DEFAULT, payload: { type: type } });
			} else {
				console.log('invalid input', type);
				dispatch({ type: ACTIONS.SET_ERROR, payload: { type: type, error: 'invalid ' + type } });
			}
		}
	}

	return [ state, parseInput, makeRequest ];
}

export { ACTIONS };
export default useInputChecker;
// import { useEffect, useState } from "react";
// import { BACKEND_END_POINT } from "../utils/global";
// import { useGlobalContext } from "../contexts/store";

// type TType = 'on demand';

// const useFetch = (endPoint: string, data?: Object, type?: TType) => {

// 	const { dispatch } = useGlobalContext();
// 	const [error, setError] = useState<Object | string | null>(null);
// 	const [res, setData] = useState<Object | string | null>(null);

// 	const makeRequest = async () => {
// 		dispatch({type: 'LOADING'});
// 		try {
// 			const method = data ? 'POST' : 'GET';
// 			const headers = data ? [

// 			] : [];

// 			const response = await fetch(BACKEND_END_POINT + endPoint, {
// 				method,
// 				headers,
// 				body: data ? JSON.stringify(data) : null
// 			});
			
// 			const body = await response.json();
			
// 			if (!response.ok || response.status != 200) {
// 				throw body.errors;
// 			}
// 			setData(body);
// 		}
// 		catch (error: any) {
// 			console.log('error', error);
// 			setError(error);
// 		}
// 		dispatch({type: 'LOADING'});
// 	}

// 	useEffect(() => {
// 		if (type != 'on demand') {
// 			makeRequest();
// 		}
// 	}, [])

// 	return {makeRequest, res, error}
// }

// export default useFetch;
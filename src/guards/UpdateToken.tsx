import { ReactNode, Suspense, useEffect } from "react";
import { useAuthContext } from "../contexts/authProvider";
import jwt from "../utils/jwt";
import Loading from "../components/Loading";
import { Navigate } from "react-router-dom";

const token = await jwt.refresh();

interface Props {
	children: ReactNode
}

function UpdateToken({children}: Props) {
	const { dispatch } = useAuthContext();

	useEffect(() => {
		dispatch({type: 'TOKEN', token: token})
	}, [])

	return ( 
		<Suspense fallback={<Loading />}>
			{token && children}
			{!token && <Navigate to='/login' />}
		</Suspense>
	 );
}

export default UpdateToken;
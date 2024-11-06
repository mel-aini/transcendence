import { ComponentType, ReactNode, Suspense, useEffect } from "react";
import { AUTH_OPTS, useAuthContext } from "@/contexts/authProvider";
import jwt from "@/utils/jwt";
import Loading from "@/components/Loading";
import { Navigate, useLocation } from "react-router-dom";

const token = await jwt.refresh();

type route = string

interface Props {
	children: ReactNode
	inFail?: route
	Component?: ComponentType
}

function UpdateToken({children, inFail = '/login', Component}: Props) {
	const { dispatch } = useAuthContext();
	const location = useLocation();
	
	useEffect(() => {
		dispatch({type: AUTH_OPTS.TOKEN, token: token})
	}, [])

	return ( 
		<Suspense fallback={<Loading />}>
			{token && children}
			{!token && Component && <Component />}
			{!token && !Component && <Navigate to={inFail} state={{ refer: location.pathname }} />}
		</Suspense>
	 );
}

export default UpdateToken;
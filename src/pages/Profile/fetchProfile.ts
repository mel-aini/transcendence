import axios from "axios";
import { BACKEND_END_POINT } from "../../utils/global";
import jwt from "../../utils/jwt";
import { ProfileRes } from "../../types/profile";

const fetchProfile = async (uri: string) => {
	let	profileRes: any = {data: null, status: 200};

	try {
		const res = await axios.get(BACKEND_END_POINT + 'api/' + uri, {
			headers: {
				"Authorization": "Bearer " + jwt.getAccessToken(),
			}
		});
		profileRes = {
			data: res.data,
			status: 200
		}
		// throw new Error('internal server error')
		// setData(res.data);
	} catch (error: any) {
		if (error.response.status == 404) {
			// to replace with Not Found
			profileRes = {
				data: null,
				status: 404
			}
		} else if (error.response.status == 401) {
			try {
				const body = {refresh: jwt.getRefreshToken()};
				
				const res = await axios.post(BACKEND_END_POINT + 'api/token/refresh', body);
				jwt.save(res.data);
				try {
					const res = await axios.get(BACKEND_END_POINT + 'api/' + uri, {
						headers: {
							"Authorization": "Bearer " + jwt.getAccessToken(),
						}
					});
					profileRes = {
						data: res.data,
						status: 200
					}
					// throw new Error('internal server error')
				} catch (error: any) {
					if (error.response.status == 404)
					{
						profileRes = {
							data: null,
							status: 404
						}
					}
					else if (error.response.status == 401)
						{
							profileRes = {
								data: null,
								status: 401
							}
						}
					}
				} catch (error : any) {
				if (error.response.status == 404)
				{
					profileRes = {
						data: null,
						status: 404
					}
				}
				else if (error.response.status == 401)
				{
					profileRes = {
						data: null,
						status: 401
					}
				}
			}
		}
	}
	return (profileRes);
}

export default fetchProfile;
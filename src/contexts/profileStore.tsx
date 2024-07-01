import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";
import { FriendsData, MatchesData, UserData } from "../types/profile";

export enum Actions {
	EditProfile,
	AddFriend,
	Friend,
	SendingInvitation,
	PendingInvitation,
	Blocked
}

export interface ProfileData {
	userData: UserData | null,
	friendAction: Actions | null,
	// friendsData: FriendsData[] | null,
	// matchesData: MatchesData[] | null,
	// user: string,
	// seeAll: boolean
}

const initialState: ProfileData = {
	userData: null,
	friendAction: null,
	// friendsData: null,
	// matchesData: null,
	// user: "profile",
	// seeAll: false
};

export const ProfileContext = createContext<{state: ProfileData, dispatchProfile: Dispatch<any>}>({
	state: initialState,
	dispatchProfile: () => {}
});

const reducer = (state: ProfileData, action: any) => {
	switch (action.type)
	{
		case 'USER_DATA':
			return { 
				...state, 
				userData: action.userData
			}
		case 'FRIEND_ACTION':
			return { 
				...state, 
				friendAction: action.friendAction
			}
		// case 'FRIENDS_DATA':
		// 	return { 
		// 		...state, 
		// 		friendsData: action.friendsData
		// 	}
		// case 'MATCHES_DATA':
		// 	return { 
		// 		...state, 
		// 		matchesData: action.matchesData
		// 	}
		// case 'USER':
		// 	return { 
		// 		...state, 
		// 		user: action.user
		// 	}
		// case 'SEE_ALL':
		// 	return { 
		// 		...state, 
		// 		seeAll: action.seeAll
		// 	}
		default:
			return state;
	}
}

const ProfileContextProvider = ({children} : {children: ReactNode}) => {
	const [state, dispatchProfile] = useReducer(reducer, initialState);

	return (
		<ProfileContext.Provider value={{state, dispatchProfile}}>
			{children}
		</ProfileContext.Provider>
	)
}

export const useProfileContext = () => useContext(ProfileContext);
export default ProfileContextProvider;

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
	friendsData: FriendsData[] | null,
	settings: boolean
	// matchesData: MatchesData[] | null,
	// user: string,
}

const initialState: ProfileData = {
	userData: null,
	friendsData: null,
	settings: false
	// matchesData: null,
	// user: "profile",
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
		case 'FRIEND_DATA':
			return { 
				...state, 
				friendsData: action.friendsData
			}
		case 'SETTINGS':
			return { 
				...state, 
				settings: action.settings
			}
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

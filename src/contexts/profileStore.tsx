import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";
import { FriendsData, MatchesData, UserData } from "../types/profile";

export enum Actions {
	GoToProfile,
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
	matchesData: MatchesData[] | null,
	seeAllFriends: boolean,
	refreshUser: boolean,
	// user: string,
}

const initialState: ProfileData = {
	userData: null,
	friendsData: null,
	matchesData: null,
	seeAllFriends: false,
	refreshUser: false,
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
		case 'MATCHES_DATA':
			return { 
				...state, 
				matchesData: action.matchesData
			}
		case 'SEE_ALL_FRIENDS':
			return { 
				...state, 
				seeAllFriends: action.seeAllFriends
			}
		case 'REFRESH_USER':
			return { 
				...state, 
				refreshUser: !state.refreshUser
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

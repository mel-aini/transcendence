import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";
import { INotification } from "./store";

export interface GlobalStateProps {
	newNotifications: INotification[],
	isRead: boolean
}

const initialState: GlobalStateProps = {
	newNotifications: [],
	isRead: true
};

export const GlobalContext = createContext<{state: GlobalStateProps, dispatch: Dispatch<any>}>({
	state: initialState,
	dispatch: () => {}
});

const reducer = (state: GlobalStateProps, action: any) => {
	switch (action.type)
	{
		case 'PUSH_NOTIFICATION':
			const updated = [...state.newNotifications, action.notification];
			setTimeout(() => {
                action.dispatch({ type: 'POP_NOTIFICATION' });
            }, 3000);
			return { ...state, newNotifications: updated, bell: true }
		case 'POP_NOTIFICATION':
			const newNotifications = state.newNotifications.slice(1);
			return { ...state, newNotifications };
		case 'MARK_IS_READ':
			return { ...state, isRead: action.payload };
		case 'CLEAR':
			return { ...state, isRead: action.payload };
		default:
			return state;
	}
}

const NotificationsProvider = ({children} : {children: ReactNode}) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<GlobalContext.Provider value={{state, dispatch }}>
			{children}
		</GlobalContext.Provider>
	)
}

export const useNotificationsContext = () => useContext(GlobalContext);
export default NotificationsProvider;

import ConversationBar from "./ConversationBar";
import { useChatContext } from "../../../contexts/chatStore";

// let convs: Data[] = [
// 	{
// 		username: 'abel-all',
// 		profileImage: "https://images.unsplash.com/photo-1491433415365-da7acd5425cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHBpbmclMjBwb25nJTIwcGxheWVyfGVufDB8fDB8fHww",
// 		lastMessage: {
// 			value: 'a feen a khay brother',
// 			date: '22:23',
// 			state: 'read'
// 		}
// 	},
// 	{
// 		username: 'ochouikh',
// 		profileImage: "https://images.unsplash.com/photo-1659303388080-257f9fcefc27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBpbmclMjBwb25nJTIwcGxheWVyfGVufDB8fDB8fHww",
// 		lastMessage: {
// 			value: 'salam',
// 			date: '22:23',
// 			state: 'unread'
// 		}
// 	},
// 	{
// 		username: 'hisoka',
// 		profileImage: "https://plus.unsplash.com/premium_photo-1678742305406-9d3b23ccab50?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGdhbWluZyUyMHBsYXllciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
// 		lastMessage: {
// 			value: 'tbarkllah 3lik',
// 			date: '22:23',
// 			state: 'sent'
// 		}
// 	},
// 	{
// 		username: 'hisoka',
// 		profileImage: "https://plus.unsplash.com/premium_photo-1677870728153-c5fc37e5387b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGdhbWluZyUyMHBsYXllciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
// 		lastMessage: {
// 			value: 'tbarkllah 3lik',
// 			date: '22:23',
// 			state: 'unread'
// 		}
// 	},
// 	{
// 		username: 'hisoka',
// 		profileImage: "https://images.unsplash.com/photo-1669937401447-7cfc6e9906e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGdhbWluZyUyMHBsYXllciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
// 		lastMessage: {
// 			value: 'tbarkllah 3lik',
// 			date: '22:23',
// 			state: 'sent'
// 		}
// 	},
// 	{
// 		username: 'hisoka',
// 		profileImage: "https://plus.unsplash.com/premium_photo-1661679559212-d1699803e599?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc3fHxnYW1pbmclMjBwbGF5ZXIlMjBwcm9maWxlfGVufDB8fDB8fHww",
// 		lastMessage: {
// 			value: 'tbarkllah 3lik',
// 			date: '22:23',
// 			state: 'sent'
// 		}
// 	},
// 	{
// 		username: 'hisoka',
// 		profileImage: "https://images.unsplash.com/photo-1595347097560-69238724e7bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbiUyMHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
// 		lastMessage: {
// 			value: 'tbarkllah 3lik',
// 			date: '22:23',
// 			state: 'sent'
// 		}
// 	},
// 	{
// 		username: 'hisoka',
// 		profileImage: "https://images.unsplash.com/photo-1530090382228-7195e08d7a75?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRhcmslMjBtYW4lMjBwcm9maWxlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
// 		lastMessage: {
// 			value: 'tbarkllah 3lik',
// 			date: '22:23',
// 			state: 'sent'
// 		}
// 	},
// 	{
// 		username: 'abel-all',
// 		profileImage: "https://images.unsplash.com/photo-1491433415365-da7acd5425cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHBpbmclMjBwb25nJTIwcGxheWVyfGVufDB8fDB8fHww",
// 		lastMessage: {
// 			value: 'a feen a khay brother',
// 			date: '22:23',
// 			state: 'read'
// 		}
// 	},
// 	{
// 		username: 'ochouikh',
// 		profileImage: "https://images.unsplash.com/photo-1659303388080-257f9fcefc27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBpbmclMjBwb25nJTIwcGxheWVyfGVufDB8fDB8fHww",
// 		lastMessage: {
// 			value: 'salam',
// 			date: '22:23',
// 			state: 'read'
// 		}
// 	},
// 	{
// 		username: 'hisoka',
// 		profileImage: "https://images.unsplash.com/photo-1659303388080-257f9fcefc27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBpbmclMjBwb25nJTIwcGxheWVyfGVufDB8fDB8fHww",
// 		lastMessage: {
// 			value: 'tbarkllah 3lik',
// 			date: '22:23',
// 			state: 'sent'
// 		}
// 	},
// 	{
// 		username: 'hisoka',
// 		profileImage: "https://plus.unsplash.com/premium_photo-1677870728153-c5fc37e5387b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGdhbWluZyUyMHBsYXllciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
// 		lastMessage: {
// 			value: 'tbarkllah 3lik',
// 			date: '22:23',
// 			state: 'sent'
// 		}
// 	},
// 	{
// 		username: 'hisoka',
// 		profileImage: "https://images.unsplash.com/photo-1669937401447-7cfc6e9906e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGdhbWluZyUyMHBsYXllciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
// 		lastMessage: {
// 			value: 'tbarkllah 3lik',
// 			date: '22:23',
// 			state: 'sent'
// 		}
// 	},
// 	{
// 		username: 'hisoka',
// 		profileImage: "https://plus.unsplash.com/premium_photo-1661679559212-d1699803e599?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc3fHxnYW1pbmclMjBwbGF5ZXIlMjBwcm9maWxlfGVufDB8fDB8fHww",
// 		lastMessage: {
// 			value: 'tbarkllah 3lik',
// 			date: '22:23',
// 			state: 'sent'
// 		}
// 	},
// 	{
// 		username: 'hisoka',
// 		profileImage: "https://images.unsplash.com/photo-1595347097560-69238724e7bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hbiUyMHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
// 		lastMessage: {
// 			value: 'tbarkllah 3lik',
// 			date: '22:23',
// 			state: 'sent'
// 		}
// 	},
// 	{
// 		username: 'hisoka',
// 		profileImage: "https://images.unsplash.com/photo-1530090382228-7195e08d7a75?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRhcmslMjBtYW4lMjBwcm9maWxlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
// 		lastMessage: {
// 			value: 'tbarkllah 3lik',
// 			date: '22:23',
// 			state: 'sent'
// 		}
// 	}
// ]

// convs = []

interface Props {
	className?: string
}

function ConversationsList({className, ...props}: Props) {
	const {state, dispatch} = useChatContext();
	
	const handler = () => {
		dispatch({type: 'FOCUS', state: true})
	}

	return ( 
		<div className="flex flex-col gap-[20px]" {...props}>
			{
				state.conversations.length != 0 && state.conversations.map((conv, index) => {
					return <ConversationBar onClick={handler} key={index} data={conv} />
				})
			}
			{
				state.conversations.length == 0 && 
				<div className="w-full flex flex-col items-center mt-5 font-light text-sm">
					You have no conversations
				</div>
			}
		</div>
	);
}

export default ConversationsList;
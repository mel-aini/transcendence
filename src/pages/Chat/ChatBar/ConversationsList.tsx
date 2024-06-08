import { MouseEvent, useEffect, useState } from "react";
import ConversationBar from "./ConversationBar";
import { useChatContext } from "../../../contexts/chatStore";

type State = 'read' | 'unread' | 'sent'

export interface Data {
	username: string
	lastMessage: {
		value: string
		date: string
		state: State
	}
}

let convs: Data[] = [
	{
		username: 'abel-all',
		lastMessage: {
			value: 'a feen a khay brother',
			date: '22:23',
			state: 'unread'
		}
	},
	{
		username: 'ochouikh',
		lastMessage: {
			value: 'salam',
			date: '22:23',
			state: 'read'
		}
	},
	{
		username: 'hisoka',
		lastMessage: {
			value: 'tbarkllah 3lik',
			date: '22:23',
			state: 'sent'
		}
	},
	{
		username: 'hisoka',
		lastMessage: {
			value: 'tbarkllah 3lik',
			date: '22:23',
			state: 'sent'
		}
	},
	{
		username: 'hisoka',
		lastMessage: {
			value: 'tbarkllah 3lik',
			date: '22:23',
			state: 'sent'
		}
	},
	{
		username: 'hisoka',
		lastMessage: {
			value: 'tbarkllah 3lik',
			date: '22:23',
			state: 'sent'
		}
	},
	{
		username: 'hisoka',
		lastMessage: {
			value: 'tbarkllah 3lik',
			date: '22:23',
			state: 'sent'
		}
	},
	{
		username: 'hisoka',
		lastMessage: {
			value: 'tbarkllah 3lik',
			date: '22:23',
			state: 'sent'
		}
	},
	{
		username: 'hisoka',
		lastMessage: {
			value: 'tbarkllah 3lik',
			date: '22:23',
			state: 'sent'
		}
	},
	{
		username: 'hisoka',
		lastMessage: {
			value: 'tbarkllah 3lik',
			date: '22:23',
			state: 'sent'
		}
	},
]

// convs = []

interface Props {
	className?: string
}

function ConversationsList({className, ...props}: Props) {
	const {dispatch} = useChatContext();

	const handler = () => {
		dispatch({type: 'FOCUS', state: true})
	}

	return ( 
		<div className="flex flex-col gap-[20px]" {...props}>
			{
				convs.length != 0 && convs.map((conv, index) => {
					return <ConversationBar onClick={handler} key={index} data={conv} />
				})
			}
			{
				convs.length == 0 && 
				<div className="w-full flex flex-col items-center mt-5 font-light">
					You have no conversation
				</div>
			}
		</div>
	);
}

export default ConversationsList;
import { MouseEvent, useState } from "react";
import ConversationBar from "./ConversationBar";

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
]

// convs = []

interface Props {
	className?: string
}

function ConversationsList({className}: Props) {
	const [focusedElem, setFocusedElem] = useState(0);

	const handler = (e: MouseEvent<HTMLDivElement>, index: number) => {
		setFocusedElem(index);
	}

	return ( 
		<div className={"mt-8" + (className ? ` ${className}` : '')}>
			{
				convs.length != 0 && convs.map((conv, index) => {
					return <ConversationBar onClick={(e) => handler(e, index)} key={index} data={conv} className="px-5" isFocus={focusedElem == index} />
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
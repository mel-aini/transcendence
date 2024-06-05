import Message from "../Message";
import {motion} from 'framer-motion'
import ConversationHeader from "./ConversationHeader";

function Conversation() {
	return ( 
		<motion.div 
			initial={{x: '100%'}}
			animate={{x: 0}}
			exit={{x: '100%'}}
			transition={{
				duration: 0.3,
				ease: 'easeInOut'
			}}
			className="w-full h-full flex flex-col absolute top-0 left-0 sm:static z-10">
			<ConversationHeader />
			<div className="grow bg-bg overflow-auto p-5 flex flex-col gap-10">
				<Message type="arrive" date="22:23">nta maghatsalish dak l ui</Message>
				<Message type="sent" date="22:23">chawer 3lia</Message>
				<Message type="arrive" date="22:23">Lorem ipsum dolor sit amet consectetur ipsum dolor ipsum dolor.</Message>
				<Message type="sent" date="22:23">chawer 3lia lorem ipsum dolorsit amet consectetur ipusm</Message>
				<Message type="arrive" date="22:23">chawer 3lia lorem ipsum dolorsit amet consectetur ipusm</Message>
				<Message type="sent" date="22:23">chawer 3lia lorem ipsum dolorsit amet consectetur ipusm</Message>
				<Message type="arrive" date="22:23">chawer 3lia lorem ipsum dolorsit amet consectetur ipusm</Message>
				<Message type="sent" date="22:23">chawer 3lia lorem ipsum dolorsit amet consectetur ipusm</Message>
				<Message type="arrive" date="22:23">chawer 3lia lorem ipsum dolorsit amet consectetur ipusm</Message>
				<Message type="sent" date="22:23">chawer 3lia lorem ipsum dolorsit amet consectetur ipusm</Message>
				<Message type="arrive" date="22:23">chawer 3lia lorem ipsum dolorsit amet consectetur ipusm</Message>
				<Message type="sent" date="22:23">chawer 3lia lorem ipsum dolorsit amet consectetur ipusm</Message>
				<Message type="sent" date="22:23">chawer 3lia lorem ipsum dolorsit amet consectetur ipusm</Message>
			</div>
			<div className="w-full px-5 h-[50px] bg-[#1D1D1D] shrink-0"></div>
		</motion.div>
	);
}

export default Conversation;
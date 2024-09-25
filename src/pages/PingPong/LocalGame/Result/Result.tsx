import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import UserBox from "./UserBox";
import { motion } from "framer-motion";

const Result = ({rightScore, leftScore}: {rightScore: number, leftScore: number}) => {
	const navigate = useNavigate();

	const clickHandler = () => {
		navigate("/ping-pong");
	}

	return (
		<motion.div className="w-full flex flex-col justify-between items-center"
		initial="hidden"
		animate="visible"
		>
			<motion.h1 initial={{opacity: 0, top: '-5rem'}} animate={{opacity: 1, top: '0rem'}} transition={{duration: 0.3}}
				className="relative top-0 text-third text-center text-4xl pb-11 italic font-montserrat">End Game</motion.h1>
			<motion.span
			initial={{opacity: 0, top: '-5rem'}}
			animate={{opacity: 1, top: '0rem'}}
			transition={{duration: 0.3, delay: 1}}
			className="relative top-0 text-center text-2xl pb-[53px]">Final score:</motion.span>
			<motion.div
			initial={{opacity: 0, top: '-5rem'}}
			animate={{opacity: 1, top: '0rem'}}
			transition={{duration: 0.3, delay: 1.5}}
			className="relative top-0 flex w-full justify-center items-center gap-4 pb-[53px]">
				<UserBox username={'player 1'} userImage={''} />
				<div className={"max-w-[86px] w-full h-[86px] flex justify-center items-center rounded-[10px] border border-border bg-secondary text-[32px]"}>
					{rightScore}
				</div>
				<div className={"max-w-[86px] w-full h-[86px] flex justify-center items-center rounded-[10px] border border-border bg-secondary text-[32px]"}>
					{leftScore}
				</div>
				<UserBox username={'player 2'} userImage={''} />
			</motion.div>
			<motion.div
			initial={{opacity: 0, top: '-5rem'}}
			animate={{opacity: 1, top: '0rem'}}
			transition={{duration: 0.3, delay: 2}}
			onClick={clickHandler}
			className="relative top-0 max-w-[344px] h-full w-full">
				<Button className="h-full w-full">continue</Button>
			</motion.div>
		</motion.div>
	);
}

export default Result;
import { Link } from "react-router-dom";
import NewButton from "../../components/NewButton";
import Container from "../../components/Container";

interface Props {
	className?: string
}

const PingPong = ({ className }: Props) => {
	return (
		<div className={className}>
			<div className="flex justify-between items-center py-8">
				<h1 className="text-4xl md:text-6xl font-semibold grow shrink-0">Ping Pong</h1>
				<Link to="/ping-pong">
					<NewButton className="hidden sm:block h-full w-full max-w-[340px]">Start a game</NewButton>
				</Link>
			</div>
			<Container className="h-[400px]"></Container>
			<NewButton className="sm:hidden h-full w-full mt-8">Start a game</NewButton>
		</div>
	)
}

export default PingPong;
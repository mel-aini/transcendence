import { Link } from "react-router-dom";
import NewButton from "../../components/NewButton";

interface Props {
	className?: string
}

const PingPong = ({ className }: Props) => {
	return (
		<div className={className}>
			<div className="grid grid-cols-1 sm:grid-cols-2 h-[400px] bg-secondary rounded-md border-white">
				<div className="flex flex-col justify-between p-10">
					<div className='space-y-8'>
						<h1 className="text-4xl md:text-5xl font-semibold grow shrink-0">Ping Pong</h1>
						<p>Lorem ipsum dolor sit amet consectetur. Interdum maecenas quis porttitor nunc et habitant vestibulum risus facilisis.</p>
					</div>
					<div>
						<Link to="/ping-pong">
							<NewButton className="h-full w-full max-w-[340px]">Start a game</NewButton>
						</Link>
					</div>
				</div>
				<div className="hidden sm:block grow shrink-0 bg-login bg-no-repeat bg-cover bg-center">
					<div className="w-full h-full bg-gradient-to-l from-transparent to-secondary"></div>
				</div>
			</div>
		</div>
	)
}

export default PingPong;
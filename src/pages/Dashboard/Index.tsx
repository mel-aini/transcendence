import Incoming from "./Incoming";
import PingPong from "./PingPong";
import Tournements from "./Tournements";

const Index = () => {

	return (
		<div className="w-full relative z-0">
			<div className="flex flex-col gap-10 lg:flex-row lg:items-end w-full">
				<PingPong className="w-full grow order-2 lg:order-1" />
				<Incoming className=" w-auto lg:order-2" />
			</div>
			<Tournements className="mt-10" />
		</div>
	)
}

export default Index;
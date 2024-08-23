import { FiBell } from "react-icons/fi";
import { INotification } from "../contexts/store";

interface Props {
	data: INotification
}

const Notification = ({ data }: Props) => {
	return (
		<div className="p-5 bg-secondary rounded-lg space-y-5">
			<div className="flex gap-5 items-center">
				<div className="shrink-0 w-8 flex justify-center items-center">
					<FiBell className="text-3xl" />
				</div>
				<div>
					<p>{data.data.content}</p>
				</div>
			</div>
			{data.data.type == 'friend-request' ||  data.data.type == 'game-request' && 
			<div className="pl-[52px] grid grid-cols-2 gap-2">
				<button className="flex justify-center items-center border border-border py-2 rounded-lg">reject</button>
				<button className="flex justify-center items-center border border-primary text-primary py-2 rounded-lg">accept</button>
			</div>}
		</div>
	);
}

export default Notification;
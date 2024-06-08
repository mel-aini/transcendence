import User from "../../../components/User";

function OnlineFriends() {
	return ( 
		<div className="online-friends w-full h-[40px] bg-bg items-center gap-3 flex overflow-x-auto">
			<User className="h-[40px] min-w-[40px]" width={40} url="https://cdn.intra.42.fr/users/310f20caa8f2fff044bda72e14f997ea/ochouikh.jpg" />
			<User className="h-[40px] min-w-[40px]" width={40} url="https://cdn.intra.42.fr/users/310f20caa8f2fff044bda72e14f997ea/ochouikh.jpg" />
			<User className="h-[40px] min-w-[40px]" width={40} url="https://cdn.intra.42.fr/users/310f20caa8f2fff044bda72e14f997ea/ochouikh.jpg" />
			<User className="h-[40px] min-w-[40px]" width={40} url="https://cdn.intra.42.fr/users/310f20caa8f2fff044bda72e14f997ea/ochouikh.jpg" />
			<User className="h-[40px] min-w-[40px]" width={40} url="https://cdn.intra.42.fr/users/310f20caa8f2fff044bda72e14f997ea/ochouikh.jpg" />
		</div>
	);
}

export default OnlineFriends;
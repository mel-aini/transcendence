interface Props {
	username: string,
	level: number,
	userImage: string
}

function UserBox({username, level, userImage}: Props) {
	return (
		<div className="max-w-[286px] w-full h-[86px] flex justify-between items-center lg:px-8 px-3 rounded-[5px] border-border bg-secondary">
			<div className="flex gap-3 items-center">
				<img src={userImage} alt="img" className="w-[41px] h-[41px] rounded-full border border-primary overflow-hidden" />
				<span className="text-base">{username}</span>
			</div>
			<span >lvl {level}</span>
		</div>
	);
}

export default UserBox;
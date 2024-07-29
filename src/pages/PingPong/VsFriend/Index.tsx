import { FiSearch } from "react-icons/fi";

interface Friend {
	image: string,
	name: string,
	level: number
}

function FriendBar({friend} : {friend: Friend}) {
	return (
		<div className="flex justify-between items-center h-[50px] gap-4">
			<div className="h-full w-full flex mobile:justify-between justify-center items-center border border-border rounded-md mobile:px-5 px-3 gap-2">
				<div className="flex items-center gap-4">
					<img src={friend.image} className="w-[31px] h-[31px] rounded-full border border-primary overflow-hidden shrink-0" />
					<span className="font-normal text-base truncate mobile:w-16 w-10">{friend.name}</span>
				</div>
				<span className="font-normal text-base mobile:block hidden shrink-0">lvl {friend.level}</span>
			</div>
			<div className="border border-border bg-secondary rounded-md h-full shrink-0 flex justify-center items-center sm:px-9 px-5">
				<span className="text-primary sm:text-base text-sm">invite</span>
				{/* <span className="text-gray1 sm:text-base text-sm">sent</span> */}
			</div>
		</div>
	)
}

function VsFriend() {
	const friends: Friend[] = [
		{
			image: "https://images.unsplash.com/photo-1669937401447-7cfc6e9906e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGdhbWluZyUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
			name: "user1",
			level: 1,
		},
		{
			image: "https://images.unsplash.com/photo-1669937401447-7cfc6e9906e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGdhbWluZyUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
			name: "user2",
			level: 2,
		},
		{
			image: "https://images.unsplash.com/photo-1669937401447-7cfc6e9906e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGdhbWluZyUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
			name: "usessdsdsdfsdfsdfsdffr3",
			level: 3,
		},
	]
	return (
		<div className="min-h-[calc(100vh-100px)] flex justify-center items-center">
			<div className="w-full max-w-[700px] flex flex-col bg-secondary border border-border rounded-md p-10 gap-7">
				<div className="flex flex-col gap-4">
					<h1 className="text-2xl font-semibold">Play against a friend</h1>
					<p className="text-base font-normal">search for a friend and invite it in game</p>
				</div>
				<div className="flex flex-col gap-5">
					<div className="flex h-[50px] gap-3">
						<input type="text" className="w-full h-full border border-border focus:border-primary duration-200 rounded-md px-5 py-3 outline-none bg-transparent" placeholder="search" />
						<div className="w-[50px] shrink-0 h-full flex justify-center items-center border border-border rounded-md cursor-pointer">
							<FiSearch className='text-2xl' />
						</div>
					</div>
					<div className="flex flex-col gap-3">
						{
							friends.map((friend: Friend, key: number) => {
								return (
									<FriendBar friend={friend} key={key} />
								)
							})
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default VsFriend;
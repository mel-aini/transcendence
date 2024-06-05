interface Props {
	className?: string
}

function NavBar({className}: Props) {
	return ( 
		<div className={"w-full left-0 h-[84px] bg-bg border-y border-white flex justify-center items-center" + (className ? ` ${className}` : '')}>
			icons
		</div>
	);
}

export default NavBar;
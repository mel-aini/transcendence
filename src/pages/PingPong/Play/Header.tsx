import pause from "/pause_icon.svg"
import help from "/Help_icon.svg"

const Header = () => {
	return (
		<div className="w-full flex justify-between items-center">
			<div className="flex gap-1">
				<div className="relative bg-secondary w-[40px] h-[40px]">
					<div className="absolute w-[2px] h-[70%] top-full -translate-y-full bg-primary"/> {/* height will be dynamic */}
					<span className="absolute text-primary content-center text-center w-full h-full">7</span>
				</div>
				<div className="relative bg-secondary w-[40px] h-[40px]">
					<div className="absolute w-[2px] h-[50%] top-full -translate-y-full bg-white"/> {/* height will be dynamic */}
					<span className="absolute content-center text-center w-full h-full">5</span>
				</div>
				<div className="bg-secondary w-[133px] h-[40px] flex items-center justify-between gap-1 px-2">
					<img src="/ebennamr.jpeg" alt="" className="w-[26px] h-[26px] border rounded-full overflow-hidden shrink-0"/>
					<span className="shrink overflow-hidden text-ellipsis">ebennamer</span>
				</div>
			</div>
			<div className="flex gap-1">
				<div className="bg-secondary w-[40px] h-[40px] flex justify-center items-center">
					<img src={pause} alt="pause" />
				</div>
				<div className="bg-secondary w-[40px] h-[40px] flex justify-center items-center">
					<img src={help} alt="help" />
				</div>
			</div>
		</div>
	)
}

export default Header;
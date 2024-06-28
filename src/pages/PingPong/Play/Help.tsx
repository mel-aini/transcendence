import UpSquared from "/UpSquared.svg"
import WKey from "/WKey.svg"
import SKey from "/SKey.svg"

const Help = () => {
	return (
		<div className="w-full h-full px-3 flex flex-col justify-around items-center">
			<span className="text-primary font-semibold text-center text-base">How to play?</span>
			<div className="w-full flex flex-col lg:flex-row justify-between items-center duration-150">
				<div className="w-full flex flex-col justify-between items-center">
					<div className="inline-flex">
						<img src={UpSquared} alt="" className=""/>
						<img src={WKey} alt="" className=""/>
					</div>
					<span className="font-thin text-center">move up</span>
				</div>
				<div className="w-full flex flex-col justify-between items-center">
					<div className="inline-flex">
						<img src={UpSquared} alt="" className="rotate-180"/>
						<img src={SKey} alt="" className=""/>
					</div>
					<span className="font-thin text-center">move down</span>
				</div>
			</div>
		</div>
	)
}

export default Help;
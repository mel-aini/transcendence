import UP from '/UP.svg'
import DOWN from '/DOWN.svg'
import W from '/W.svg'
import S from '/S.svg'
import PADDEL_DIRECTIONS from '/PADDEL_DIRECTIONS.svg'

const Help = () => {
	return (
		<div className="w-full h-full flex flex-col justify-around items-center p-3 sm:gap-0 gap-1">
			<span className="text-primary font-semibold text-center 2xl:text-[25px] text-[1.5vw]">How to play?</span>
			<div className='flex flex-col justify-between items-center w-full sm:gap-4 gap-2'>
				<span className="text-primary font-semibold text-center 2xl:text-[25px] text-[1.5vw]">or</span>
				<div className="flex justify-between items-center w-full">
					<div className="flex flex-col justify-center items-center w-full sm:gap-2 gap-1">
						<img src={W} alt="KEY W" className='w-[4.5vw] max-w-16' />
						<img src={S} alt="KEY S" className='w-[4.5vw] max-w-16' />
					</div>
					<img src={PADDEL_DIRECTIONS} alt="PADDEL" className='w-[4.5vw] max-w-16' />
					<div className="flex flex-col justify-between items-center w-full sm:gap-2 gap-1">
						<img src={UP} alt="KEY UP" className='w-[4.5vw] max-w-16' />
						<img src={DOWN} alt="KEY DOWN" className='w-[4.5vw] max-w-16' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Help;
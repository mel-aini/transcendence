import pause from "/pause_icon.svg"
import help from "/Help_icon.svg"

function Index() {
	return (
		<div className="min-h-[90vh] flex justify-center items-center">
			<div className="flex flex-col h-full max-w-[1105px] w-4/5 justify-between items-center gap-[26px]">
				<div className="w-full flex justify-between items-center">
					<div className="flex gap-1">
						<div className="bg-secondary w-[40px] h-[40px] text-primary content-center text-center">0</div>
						<div className="bg-secondary w-[40px] h-[40px] content-center text-center">0</div>
						<div className="bg-secondary w-[133px] h-[40px] flex items-center justify-between gap-1 px-2">
							<img src="/ebennamr.jpeg" alt="" className="w-[26px] h-[26px] border rounded-full overflow-hidden shrink-0"/>
							<span className="shrink overflow-hidden text-ellipsis">ebennamer</span>
						</div>
					</div>
					<div className="flex gap-1">
						<div className="bg-secondary w-[40px] h-[40px] flex justify-center items-center">
							<img src={pause} alt="" />
						</div>
						<div className="bg-secondary w-[40px] h-[40px] flex justify-center items-center">
							<img src={help} alt="" />
						</div>
					</div>
				</div>
				<div className="relative w-full h-[585px]">
					<div className="absolute first-table-half w-[68.69%] h-full border border-white bg-secondary rounded-l-[10px]"/>
					<div className="absolute second-table-half w-[68.69%] h-full border border-white bg-secondary rounded-r-[10px] left-full -translate-x-full"/>
					<div className="absolute line-half w-[37.38%] h-full border border-white bg-green-500 left-1/2 -translate-x-1/2"/>
				</div>
			</div>
		</div>
	);
}

export default Index;
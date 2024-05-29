interface Props {
	className?: string
}

const Incoming = ({ className }: Props) => {
	return (
		<div className={className}>
			<div className="flex justify-between items-center py-8">
				<h1 className="text-4xl md:text-6xl font-semibold">Incoming</h1>
			</div>
			<div className="w-full xl:w-[400px] h-[400px] border border-primary rounded-xl flex justify-center items-center p-5">
				<p className="text-center">You have no incoming events</p>
			</div>
		</div>
	)
}

export default Incoming;
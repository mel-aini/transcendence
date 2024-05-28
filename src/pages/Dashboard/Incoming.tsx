interface Props {
	className?: string
}

const Incoming = ({ className }: Props) => {
	return (
		<div className={className}>
			<div className="flex justify-between items-center py-8">
				<h1 className="text-4xl md:text-6xl font-semibold">Incoming</h1>
			</div>
			<div className="w-full h-[300px] lg:max-w-[300px] border border-primary rounded-xl"></div>
		</div>
	)
}

export default Incoming;
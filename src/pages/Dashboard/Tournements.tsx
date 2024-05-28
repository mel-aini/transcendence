import NewButton from "../../components/NewButton";

interface Props {
	className?: string
}

const Tournements = ({ className }: Props) => {
	return (
		<div className={className}>
			<div className="flex justify-between items-center py-8 gap-3">
				<h1 className="text-4xl md:text-6xl font-semibold">Tournements</h1>
				<NewButton className="hidden sm:block h-full w-full max-w-[340px]">Create New Tournement</NewButton>
			</div>
			<div className="w-full h-[300px] border border-primary rounded-xl"></div>
			<NewButton className="sm:hidden h-full w-full mt-8">Create New Tournement</NewButton>
		</div>
	)
}

export default Tournements;
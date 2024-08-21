import { twMerge } from "tailwind-merge";
import LayoutHeader from "../../components/LayoutHeader";
import EditBar from "./EditBar";
import TFA from "./TFA";
import { IoIosArrowDown } from "react-icons/io";
import { ComponentProps, ReactNode, useState } from "react";

interface SectionProps {
	children?: ReactNode[]
	activated?: boolean
	className?: string
}

function Section({ activated, children }: SectionProps) {
	return (
		<div>
			{ children && children[0] }
			{
				children && activated && 
				<div className="py-5">
					{ children[1] }
				</div>
			}
		</div>
	)
}

interface SectionHeaderProps extends ComponentProps<'div'> {
	children?: string
	activated?: boolean
	className?: string
}

function SectionHeader({ children, activated, className, ...props }: SectionHeaderProps) {
	return (
		<div 
			className={
				twMerge("h-14 hover:border-[rgba(255,255,255,0.5)] duration-300 flex items-center justify-between bg-secondary border border-border rounded-lg px-5 cursor-pointer", className)
			}
			{...props}
			>
			<h1 className="font-medium">{ children }</h1>
			<IoIosArrowDown className={activated ? 'text-2xl rotate-90' : "text-2xl"} />
		</div>
	)
}

interface SectionContentProps extends ComponentProps<'div'> {
	children?: ReactNode
	className?: string
}

function SectionContent({ children, className }: SectionContentProps) {
	return (
		<div className={twMerge("px-5", className)}>
			{ children }
		</div>
	)
}

function Settings() {
	const [activeSection, setActiveSection] = useState<'profile' | 'security' | 'display' | null>(null);

	const toggleActiveSection = (type: 'profile' | 'security' | 'display') => {
		setActiveSection(prev => {
			if (prev == type) setActiveSection(null);
			return type;
		})
	}

	return (
		<div>
			<LayoutHeader>Settings</LayoutHeader>
			<div className="space-y-5">
				<Section activated={activeSection == 'profile'}>
					<SectionHeader onClick={() => toggleActiveSection('profile')}>Profile</SectionHeader>
					{activeSection == 'profile' && 
						<SectionContent>
							<span className="inline-block mb-3">username</span>
							<EditBar type="username"/>
							<span className="inline-block mt-5 mb-3">email</span>
							<EditBar type="email" />
						</SectionContent> }
				</Section>
				<Section activated={activeSection == 'security'}>
					<SectionHeader onClick={() => toggleActiveSection('security')}>Security</SectionHeader>
					{activeSection == 'security' && 
						<SectionContent>
							<TFA />
						</SectionContent>}
				</Section>
				<Section activated={activeSection == 'display'}>
					<SectionHeader onClick={() => toggleActiveSection('display')}>Display</SectionHeader>
					{activeSection == 'display' && 
						<SectionContent>
							<TFA />
						</SectionContent>}
				</Section>
			</div>
		</div>
	);
}

export default Settings;
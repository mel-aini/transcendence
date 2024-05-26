import { CSSProperties, HTMLInputTypeAttribute, InputHTMLAttributes, LegacyRef, useRef, useState } from "react";
import { CgEye } from "react-icons/cg";

type TOnBlur = (e?: any) => void

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	height?: number | string
	style?: CSSProperties
	className?: string
	placeholder: string,
	type: HTMLInputTypeAttribute,
	onBlur?: TOnBlur,
	onFocus?: TOnBlur
}

const Input = ({height = 40, style, className, type, onBlur, onFocus, placeholder, ...props  } : InputProps ) => {
	const [isFocus, setIsFocus] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const inputRef: LegacyRef<HTMLInputElement> = useRef<HTMLInputElement>(null)

	return (
		<div className="relative text-[14px] w-full">
			<input
				ref={inputRef}
				type={type != 'password' ? type : showPassword ? 'text' : 'password'}
				className={"bg-transparent border border-primary font-normal px-2 focus:outline-none" + " " + className}
				style={{height, ...style}}
				{...props}
				onFocus={() => { 
					setIsFocus(true);
					if (onFocus) onFocus();
				}}
				onBlur={(e) => {
					e.target.value == '' ? setIsFocus(false) : setIsFocus(true)
					if (onBlur) onBlur();
				}}
			/>
			<span className={isFocus ? "px-2 absolute text-[12px] top-[-9px] left-[15px] text-primary bg-bg duration-200" : "pointer-events-none px-3 absolute top-[9px] left-0 text-gray1 opacity-50 duration-200" } >{placeholder}</span>
			{
				type == 'password' && inputRef.current && inputRef.current.value != '' &&
				<span 
					className="absolute h-3/4 aspect-square bg-bg right-2 top-1/2 -translate-y-1/2 cursor-pointer flex justify-center items-center select-none"
					onClick={() => setShowPassword(prev => !prev)}
					>
						<CgEye className="text-lg" />
				</span>}
		</div>
	);
}

export default Input;
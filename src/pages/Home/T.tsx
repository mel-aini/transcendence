import { motion } from "framer-motion";

function T() {
	return ( 
		<svg width="61" height="53" viewBox="0 0 61 53" fill="none" xmlns="http://www.w3.org/2000/svg">
			<motion.path
				initial={{x: -50}}
				animate={{x: 0}}
				transition={{duration: 1}}
				className="t-top" d="M7.38535 0.0688477L60.4482 0.0688477L54.405 11.3447H0.310303L7.38535 0.0688477Z" fill="#14FFEC"/>
			<motion.path
				initial={{y: 50}}
				animate={{y: 0}}
				transition={{duration: 1}}
				className="t-bottom" d="M22.8621 45.9015L22.8621 11.3446L34.1379 17.1428L34.1379 52.6895L22.8621 45.9015Z" fill="#14FFEC"/>
		</svg>
	 );
}

export default T;
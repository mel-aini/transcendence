import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface InfiniteScrollObserverProps {
	endPoint: string
	start?: number
	chunkSize?: number
	whenFetched?: (data?: any) => void
	whenError?: (error?: any) => void
}

function InfiniteScrollObserver({ endPoint, start = 0, chunkSize = 10, whenFetched, whenError }: InfiniteScrollObserverProps) {
	const container = useRef(null);
	const dataRange = useRef<number[]>([start, start + chunkSize]);
	const [isLimitReached, setIsLimitReached] = useState(false);

	const callback = async (entries: IntersectionObserverEntry[]) => {
		const element = entries[0];
		if (element.isIntersecting) {
			// fetch Data
			try {
				const data = await axios.get(endPoint + '/?start=' + dataRange.current[0] + '&end=' + dataRange.current[1]);
				dataRange.current[0] += chunkSize;
				dataRange.current[1] += chunkSize;
				if (whenFetched) whenFetched(data);
			} catch (error) {
				setIsLimitReached(true);
				if (whenError) whenError(error);
			}
		}
	}
	
	useEffect(() => {
		if (!container.current) return;

		const obs = new IntersectionObserver(callback, {
			threshold: 0
		});
	
		obs.observe(container.current)
	
		return () => {
			if (!container.current) return;
			obs.unobserve(container.current);
		}
	}, [])

	return (
		<>
			{!isLimitReached && <div
				ref={container} className="h-[40px] flex justify-center items-center">
				<AiOutlineLoading3Quarters className='animate-spin' />
			</div>}
		</>
	);
}

export default InfiniteScrollObserver;
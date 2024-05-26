const Title = ({width, height, title}) => {
	return (
		<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
			<polygon points={`0 0, ${width * 75 / 100} 0, ${width} ${height}, 0 ${height}`} className="fill-primary"/>
			<text className="fill-white font-medium text-md" x={`${width * 15 / 100}`} y={'70%'}>{title}</text>
		</svg>
	)
}

export default Title;
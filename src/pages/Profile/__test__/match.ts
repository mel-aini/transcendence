export const friends = [
	{
		name: "ebennamr"
	},
	{
		name: "abel-all"
	},
	{
		name: "ychahbi"
	},
	// {
	// 	name: "ochouikh"
	// },
	// {
	// 	name: "ebennamr"
	// },
	// {
	// 	name: "ebennamr"
	// },
	// {
	// 	name: "ebennamr"
	// },
	// {
	// 	name: "ebennamr"
	// },
]

interface Props {
	username: string,
	playerName: string,
	result: {
		you :number , player: number
	}
}[]

export const data: Props | Object[] = []

for (let i = 0; i < 10;i++)
{
	const x = Math.trunc(Math.random() * 10 )
	const y = Math.trunc(Math.random() *  10)
	data.push({
		username: "ochouikh",
		playerName: "ebennamr",
		result: {you :x , player: y}
	})
}
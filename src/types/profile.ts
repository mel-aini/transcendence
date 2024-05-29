
type Url = string;

export interface MatchesData {
	total: number,
	wins: number,
	loses: number,
}

export interface UserData {
	username: string,
	matches: MatchesData
	online: boolean,
	profile_image: Url,
	bg_image: Url,
	level: {
		current: number,
		progress: number
	}
}
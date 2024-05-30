
type Url = string;

export interface MatchesData {
	total: number,
	wins: number,
	loses: number,
}

export type Relation = 'none' | 'friend' | 'send_inv' | 'rec_inv' 

export interface UserData {
	username: string,
	matches: MatchesData
	relation?: Relation
	online: boolean,
	profile_image: Url,
	bg_image: Url,
	level: {
		current: number,
		progress: number
	}
}
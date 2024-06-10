
type Url = string;

type Path = string;

export interface MatchesData {
	total: number,
	wins: number,
	loses: number,
}

export type Relation = 'none' | 'friend' | 'send_req' | 'rec_req' | 'blocker' 

export interface UserData {
	username: string,
	relation?: Relation
	profile_image: Url,
	bg_image: Url,
	total_friends: number,
	online: boolean,
	matches: MatchesData,
	level: {
		name: string,
		image: Url,
		current: number,
		progress: number
	}
}

export interface MatchesData {
	match_id: string,
	status: string,
	goals: number,
	opponent: {
		username: string,
		goals: number,
		image: Url,
		profile: Path
	}
}

export interface FriendsData {
	username: string,
	profile_image: Url,
	online?: boolean,
	profile: Path
}

export interface ProfileRes {
	data: any,
	status: number
}
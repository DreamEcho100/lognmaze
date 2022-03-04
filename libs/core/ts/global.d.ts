import {
	// NextApiRequest,
	NextApiResponse,
} from 'next';

export type TDate = string | number | Date;

export type NextApiRequestExtended = NextApiRequest & { user: { 
	id: string;
	user_session_id: string;
	login_start_date: string;
	login_end_date: string;
 } };

/* User */
export interface IUser {
	id: string;
	email: string;
	password: string;
	user_name_id: string;
	first_name: string;
	last_name: string;
	date_of_birth: string | number | Date;
	gender: string;
	country: string;
	state: string;
	city?: string;
}

/* News */

export interface INewsBasicData {
	news_id: string;
	comments_counter: '0';
	up_votes_counter: '0';
	down_votes_counter: '0';
	created_at: TDate;
	updated_at: TDate;
	author_id: string;
	author_user_name_id: string;
	author_first_name: string;
	author_last_name: string;
	author_profile_picture: string;
	author_bio: string;
}
export type INewsBlogDataTypeDataContent = string;
export interface INewsBlogData extends INewsBasicData {
	type: 'blog';
	type_data: {
		// user_vote_type: null;
		title: string;
		slug: string;
		iso_language: string;
		iso_country: string;
		image_alt: string;
		image_src: string;
		description: string;
		tags: string[];
		content?: INewsBlogDataTypeDataContent;
	};
}
export interface INewsPostData extends INewsBasicData {
	type: 'post';
	// user_vote_type: null;
	type_data: {
		content: string;
	};
}

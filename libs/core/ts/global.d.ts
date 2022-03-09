import {
	// NextApiRequest,
	NextApiResponse,
} from 'next';

export type TDate = string | number | Date;

export type NextApiRequestExtended = NextApiRequest & {
	user: {
		id: string;
		user_session_id: string;
		login_start_date: string;
		login_end_date: string;
	};
};

/* User */
export interface IUserBasicData {
	id: string;
	user_name_id: string;
	first_name: string;
	last_name: string;
	gender: string;
	cover_photo?: string;
	profile_picture?: string;
	bio: string;
	country_of_resident: string;
	state_of_resident: string;
	city_of_resident?: string;
	last_sign_in: string | number | Date;
	created_at: string | number | Date;
}
export interface IUserAuthenticatedData extends IUserBasicData {
	email?: string;
	email_verified?: boolean;
	password?: string;
	date_of_birth?: string | number | Date;
	address_of_resident?: string;
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

export type TNewsItemData = INewsBlogData | INewsPostData;
export type TNewsData = TNewsItemData[];

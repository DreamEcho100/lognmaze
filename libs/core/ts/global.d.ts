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

export type IUserBasicDataCoverPhoto = string;
export type IUserBasicDataProfilePicture = string;
export type IUserBasicDataBio = string;
export type IUserBasicDataCityOfResident = string;

export type TUserAuthenticatedDataEmail = string;
export type TUserAuthenticatedDataPassword = string;
export type TUserAuthenticatedDataEmailDateOfBirth = string | number | Date;
export type TUserAuthenticatedDataEmailAddressOfResident = string;
export interface IUserBasicData {
	id: string;
	user_name_id: string;
	first_name: string;
	last_name: string;
	gender: string;
	cover_photo?: IUserBasicDataCoverPhoto;
	profile_picture?: IUserBasicDataProfilePicture;
	bio?: IUserBasicDataBio;
	country_of_resident: string;
	state_of_resident: string;
	city_of_resident?: IUserBasicDataCityOfResident;
	last_sign_in: string | number | Date;
	created_at: string | number | Date;
}
export interface IUserAuthenticatedData extends IUserBasicData {
	email?: TUserAuthenticatedDataEmail;
	email_verified?: boolean;
	// password?: TUserAuthenticatedDataPassword;
	date_of_birth?: TUserAuthenticatedDataEmailDateOfBirth;
	// address_of_resident?: TUserAuthenticatedDataEmailAddressOfResident;
}

/* */
export interface TNewsItemCommentBasicData {
	news_comment_id: string;
	content: string;
	author_id: IUserBasicData['id'];
	author_user_name_id: IUserBasicData['user_name_id'];
	author_first_name: IUserBasicData['first_name'];
	author_last_name: IUserBasicData['last_name'];
	author_profile_picture?: IUserBasicData['profile_picture'];
	created_at: string | number | Date;
	updated_at: string | number | Date;
}

export interface TNewsItemCommentTypeReplyMain
	extends TNewsItemCommentBasicData {
	type: 'comment_main_reply';
	parent_id: TNewsItemCommentBasicData['news_comment_id'];
}
export type TNewsItemCommentMainReplies = TNewsItemCommentTypeReplyMain[];

export interface TNewsItemCommentTypeMain extends TNewsItemCommentBasicData {
	type: 'comment_main';
	replies_counter: number;
	replies?: TNewsItemCommentMainReplies;
	hit_replies_limit?: boolean;
}
export type TNewsItemCommentsMain = TNewsItemCommentTypeMain[];

/* News */

export interface INewsItemBasicData {
	news_id: string;
	comments_counter: number;
	up_votes_counter: number;
	down_votes_counter: number;
	created_at: TDate;
	updated_at: TDate;
	author_id: string;
	author_user_name_id: string;
	author_first_name: string;
	author_last_name: string;
	author_profile_picture: string;
	author_bio: string;
	comments?: TNewsItemCommentsMain;
	hit_comments_limit?: boolean;
}
export type INewsItemTypeBlogContent = string;
export interface INewsItemTypeBlogBasicData {
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
		content?: INewsItemTypeBlogContent;
	};
}
export type INewsItemTypeBlog = INewsItemBasicData & INewsItemTypeBlogBasicData;
export interface INewsItemTypePostBasicData {
	type: 'post';
	// user_vote_type: null;
	type_data: {
		content: string;
	};
}
export type INewsItemTypePost = INewsItemBasicData & INewsItemTypePostBasicData;

export type TNewsItemData = INewsItemTypeBlog | INewsItemTypePost;
export type TNewsData = TNewsItemData[];

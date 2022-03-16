import { INewsItemContextState } from './ts';

export const returnNewsItemInitialState = (): INewsItemContextState => ({
	data: {
		newsItem: {
			news_id: '',
			author_id: '',
			author_user_name_id: '',
			author_first_name: '',
			author_last_name: '',
			author_profile_picture: '',
			created_at: '',
			updated_at: '',
			author_bio: '',
			comments_counter: 0,
			down_votes_counter: 0,
			type: 'post',
			type_data: {
				content: '',
			},
			up_votes_counter: 0,
			comments: [],
			hit_comments_limit: true,
		},
		hit_comments_limit: true,
		newsItemDetailsType: 'description',
		newsItemModelDetailsType: 'content',
	},
	actions: {
		request: {},
		init: {
			getComments: {
				isLoading: false,
				error: '',
				success: false,
			},
			modal: {
				getTypeBlogContent: {
					isLoading: true,
					error: '',
					success: false,
				},
			},
		},
	},
});

import { NextPage, GetStaticProps, GetStaticPaths } from 'next';

import {
	VISITOR_PROFILE_GUEST,
	VISITOR_PROFILE_OWNER,
} from '@coreLib/constants';
import { IUserBasicData, TNewsData } from '@coreLib/ts/global';
import { IExtraReturns, TGetUsersPropFilterBy } from '@coreLib/db/pg/ts';
import pgActions from '@coreLib/db/pg/actions';
import { IPropsUserProfilePageData } from '@store/ProfilePageContext/ts';
import { setUserProfilePageContextStore } from '@store/ProfilePageContext';
import { useUserSharedState } from '@store/UserContext';

import UserProfileScreen from '@screens/Users/Profile';
import {
	ISetNewsContextStoreProps,
	setNewsContextStore,
} from '@store/NewsContext';
import pool from '@coreLib/db/pg/connection';

interface IProps {
	user: IPropsUserProfilePageData['user'];
	newsData: { news: TNewsData; hit_news_items_limit: boolean };
}

const UserProfilePage: NextPage<IProps> = ({
	user,
	newsData = {
		hit_news_items_limit: false,
		news: [],
	},
}) => {
	const [
		{
			data: { user: userData },
		},
	] = useUserSharedState();

	const { UserProfilePageContextSharedProvider } =
		setUserProfilePageContextStore({
			profileData: {
				user: user,
				visitorStatus:
					userData && user && userData.id === user.id
						? VISITOR_PROFILE_OWNER
						: VISITOR_PROFILE_GUEST, // visitorStatus,
			},
		});

	const newsExtra: ISetNewsContextStoreProps['data']['newsExtra'] = {};
	const actions: ISetNewsContextStoreProps['actions'] = {
		items: {},
	};

	newsData.news.forEach((item, index) => {
		if (index === 0) {
			actions.items[item.news_id] = {
				priorityForHeaderImage: true,
			};
		}

		newsExtra[item.news_id] = {
			hit_comments_limit: false,
			newsItemDetailsType: 'description',
			newsItemModelDetailsType: 'content',
		};
	});

	const { NewsContextSharedProvider } = setNewsContextStore({
		data: {
			news: newsData.news,
			newsExtra,
			hit_news_items_limit: !!newsData.hit_news_items_limit,
		},
		actions,
	});

	return (
		<NewsContextSharedProvider>
			<UserProfilePageContextSharedProvider>
				<UserProfileScreen />
			</UserProfilePageContextSharedProvider>
		</NewsContextSharedProvider>
	);
};

export const getStaticPaths: GetStaticPaths = /*
< {
	user_name_id: string;
} >
*/ async () => {
	const usersNameId = await pool
		.query('SELECT user_name_id FROM user_profile limit 5000')
		.then((response) => response.rows);

	const paths = usersNameId.map((user) => ({
		params: { user_name_id: user.user_name_id },
	}));

	return {
		fallback: true,
		paths,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const user_name_id = params?.user_name_id;
	if (typeof user_name_id === 'string') {
		const profileData = {} as /*{IPropsUserProfilePageData} &*/ {
			newsData: { news: TNewsData; hit_news_items_limit: boolean };
			user: IUserBasicData;
		};

		// profileData.visitorStatus =
		// 	visitorUserNameId && query.user_name_id === visitorUserNameId
		// 		? VISITOR_PROFILE_OWNER
		// 		: VISITOR_PROFILE_GUEST;
		const userFilterBy: TGetUsersPropFilterBy = [
			[
				{
					name: 'byUserNameId',
					value: user_name_id,
				},
			],
		];
		const userExtraReturns: IExtraReturns = {
			user_id: true,
			// sensitiveInfo: profileData.visitorStatus === VISITOR_PROFILE_OWNER,
			// user_password
			// user_news_counter
		};

		const user: IUserBasicData | undefined = await pgActions.users
			.get({
				extraReturns: userExtraReturns,
				filterBy: userFilterBy,
			})
			.then(
				(response: { rows: IPropsUserProfilePageData['user'][] }) =>
					response.rows[0]
			);

		if (!user) {
			// res.statusCode = 404;
			// res.statusMessage = 'User Not Found!';
			// res.end();
			return {
				// props: {
				// 	date: new Date().toISOString(),
				// },
				notFound: true,
			};
		}

		profileData.user = user;

		profileData.user.last_sign_in = profileData.user.last_sign_in.toString();
		profileData.user.created_at = profileData.user.created_at.toString();
		// if (
		// 	profileData.visitorStatus === VISITOR_PROFILE_OWNER &&
		// 	profileData.user.date_of_birth
		// ) {
		// 	profileData.user.date_of_birth =
		// 		profileData.user.date_of_birth.toString();
		// }

		const existingItems = {};
		// const { existingItems } =
		// 	itemsInObject(query, [
		// 	'filterByBlogTagsAnd',
		// 	'filterByBlogTagsOr',
		// 	// 'newsByUserId',
		// 	// 'newsCreatedBefore',
		// 	'isNewsVotedByUser',
		// 	// 'with_news_blog_content',
		// ]);

		// if (typeof existingItems.filterByBlogTagsAnd === 'string')
		// 	existingItems.filterByBlogTagsAnd = JSON.parse(
		// 		existingItems.filterByBlogTagsAnd
		// 	);
		// if (typeof existingItems.filterByBlogTagsOr === 'string')
		// 	existingItems.filterByBlogTagsOr = JSON.parse(
		// 		existingItems.filterByBlogTagsOr
		// 	);

		profileData.newsData = await pgActions.news.get({
			...existingItems,
			newsByUserId: profileData.user.id,
		});

		profileData.newsData.news.forEach((item) => {
			item.updated_at = item.updated_at.toString();
			item.created_at = item.created_at.toString();
		});

		return {
			props: {
				...profileData,
				date: new Date().toISOString(),
			},
			revalidate: 60 * 60 * 5,
		};
	}

	return {
		props: {
			date: new Date().toISOString(),
		},
		notFound: true,
	};
};

export default UserProfilePage;

import { Dispatch, useState } from 'react';

import { IUserAuthenticatedData, TNewsItemData } from '@coreLib/ts/global';
import { ICreateNewsItemReqArgs } from '@coreLib/networkReqArgs/_app/news/ts';
import { THandleSubmitForCreateAndUpdateNewsItemActionType } from '../../ts';
import { TNewsContextReducerAction } from '@store/NewsContext/ts';
import {
	requestsConstants,
	TRequestStateReducerActions,
} from '@commonLibDependent/requestState';
import networkReqArgs from '@coreLib/networkReqArgs';
import {
	handleRequestStateChanges,
	returnBearerTokenIfExist,
} from '@commonLibIndependent/fetch';
import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';

import ButtonComponent from '@commonComponentsIndependent/Button';
import NewsItemActionModal from '../../UI/Modal';

import NewsItemFormTypeBlog from '../../UI/Form/Type/Blog';
import NewsItemFormTypePost from '../../UI/Form/Type/Post';

interface IProps {
	newsItemType?: TNewsItemData['type'];
	userData: IUserAuthenticatedData;
	userToken?: string;
	modalVisibilityHandler: (isModalVisible?: boolean | undefined) => void;
	isModalVisible: boolean;
}

const NewsItemActionTypeCreate = ({
	userData,
	userToken,
	modalVisibilityHandler,
	isModalVisible,
	...props
}: IProps) => {
	const [newsItemType, setNewsItemType] = useState(
		props.newsItemType || 'blog'
	);

	const createNewsItem = async (
		newsDispatch:
			| Dispatch<TNewsContextReducerAction>
			| ((value: TNewsContextReducerAction) => void),
		{
			newsItemBasicData,
			requestsActionsDispatch,
		}: {
			newsItemBasicData: ICreateNewsItemReqArgs['bodyContent']['newsItemBasicData'];
			requestsActionsDispatch: Dispatch<TRequestStateReducerActions<'request'>>;
		}
	) => {
		const newNewsItemAuthorData = {
			author_bio: userData.bio || '',
			author_first_name: userData.first_name,
			author_last_name: userData.last_name,
			author_id: userData.id,
			author_profile_picture: userData.profile_picture || '',
			author_user_name_id: userData.user_name_id,
		};

		return await handleRequestStateChanges<{
			news_id: TNewsItemData['news_id'];
		}>({
			onInit: async () => {
				requestsActionsDispatch({
					type: requestsConstants.IS_LOADING,
					payload: {
						target: 'request',
					},
				});

				const { requestInfo, requestInit } =
					networkReqArgs._app.news.item.create({
						bodyContent: {
							newsItemBasicData: newsItemBasicData,
						},
						headersList: {
							Authorization:
								(userToken && returnBearerTokenIfExist(userToken)) || undefined,
						},
					});

				return await fetch(requestInfo, requestInit);
			},
			onError: (error) => {
				requestsActionsDispatch({
					type: requestsConstants.ERROR,
					payload: {
						target: 'request',
						error,
					},
				});
			},
			onSuccess: ({ news_id }) => {
				newsDispatch({
					type: NewsItemContextConstants.CREATE_NEW_NEWS_ITEM,
					payload: {
						newNewsItemId: news_id,
						newNewsItemAuthorData,
						newsItemBasicData,
					},
				});
				requestsActionsDispatch({
					type: requestsConstants.SUCCESS,
					payload: {
						target: 'request',
					},
				});
			},
		});
	};

	const handleSubmit: THandleSubmitForCreateAndUpdateNewsItemActionType =
		async (newsDispatch, requestsActionsDispatch, props) => {
			const fieldsCheck: string[] = [];

			if (!props.type_data.content)
				fieldsCheck.push('Content is not provided!');

			if (props.type === 'blog') {
				if (props.type_data.title.replace(/\s{2,}/g, '').length < 15)
					fieldsCheck.push('Title is less than 15 characters.');
				else if (props.type_data.title.replace(/\s{2,}/g, '').length > 120)
					fieldsCheck.push('Title is more than 120 characters.');

				if (props.type_data.tags.length < 2)
					fieldsCheck.push('At least there should be 2 tags.');
				else if (props.type_data.tags.length > 10)
					fieldsCheck.push("Tags shouldn't be more than 10.");

				if (props.type_data.image_alt.replace(/\s{2,}/g, '').length < 3)
					fieldsCheck.push('Image title is less than 3 characters.');
				else if (props.type_data.image_alt.replace(/\s{2,}/g, '').length > 150)
					fieldsCheck.push('Image title is more than 150 characters.');

				if (props.type_data.image_src.replace(/\s/g, '').length === 0)
					fieldsCheck.push('There is no image source.');
				if (!props.type_data.image_src.replace(/\s/g, '').startsWith('https'))
					fieldsCheck.push("Image source doesn't start with https.");

				if (props.type_data.description.replace(/\s{2,}/g, '').length < 25)
					fieldsCheck.push('Description is less than 25 characters.');
				else if (props.type_data.description.length > 1000)
					fieldsCheck.push('Description is more than 1000 characters.');

				if (!props.type_data.content) fieldsCheck.push('No content provided!');
				else {
					if (props.type_data.content.replace(/\s{2,}/g, '').length < 25)
						fieldsCheck.push('Content is less than 25 characters.');
					else if (props.type_data.content.length > 40000)
						fieldsCheck.push('Content is more than 40000 characters.');
				}
			} else {
				if (props.type_data.content.replace(/\s{2,}/g, '').length < 2)
					fieldsCheck.push('Content is less than 2 characters.');
			}

			if (fieldsCheck.length > 0) {
				// setInputsError(fieldsCheck);
				return fieldsCheck;
			} else {
				await createNewsItem(newsDispatch, {
					requestsActionsDispatch,
					newsItemBasicData: {
						type: props.type,
						type_data: props.type_data,
					} as ICreateNewsItemReqArgs['bodyContent']['newsItemBasicData'],
				});
				modalVisibilityHandler();
			}
		};

	return (
		<NewsItemActionModal
			modalVisibilityHandler={modalVisibilityHandler}
			isModalVisible={isModalVisible}
			HeaderComponent={
				<header>
					<h2>Create News</h2>
					<div className='buttons-holder'>
						<ButtonComponent
							onClick={() => {
								setNewsItemType('blog');
							}}
						>
							Blog
						</ButtonComponent>{' '}
						<ButtonComponent
							onClick={() => {
								setNewsItemType('post');
							}}
						>
							Post
						</ButtonComponent>
					</div>
				</header>
			}
			BodyComponent={
				<>
					{newsItemType === 'blog' && (
						<NewsItemFormTypeBlog
							handleSubmit={handleSubmit}
							actionType='create'
							newsItemType={newsItemType}
						/>
					)}
					{newsItemType === 'post' && (
						<NewsItemFormTypePost
							handleSubmit={handleSubmit}
							newsItemType={newsItemType}
						/>
					)}
				</>
			}
		/>
	);
};

export default NewsItemActionTypeCreate;

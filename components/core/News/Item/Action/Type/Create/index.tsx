import { Dispatch, useEffect, useState } from 'react';

import {
	// INewsItemTypeBlogBasicData,
	// INewsItemTypePostBasicData,
	IUserAuthenticatedData,
	TNewsItemData,
} from '@coreLib/ts/global';
import { createNewsItem } from '@store/NewsContext/actions';
import { ICreateNewsItemReqArgs } from '@coreLib/networkReqArgs/_app/news/ts';

import ButtonComponent from '@commonComponentsIndependent/Button';
import NewsItemActionModal from '../../UI/Modal';

import NewsItemFormTypeBlog from '../../UI/Form/Type/Blog';
import NewsItemFormTypePost from '../../UI/Form/Type/Post';
// import { TNewsContextReducerAction } from '@store/NewsContext/ts';
import { THandleSubmitForCreateAndUpdateNewsItemActionType } from '../../ts';

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

	const handleSubmit: THandleSubmitForCreateAndUpdateNewsItemActionType =
		async (newsDataDispatch, props) => {
			// if (createItemRequest?.isLoading) return;

			const fieldsCheck: string[] = [];

			if (!props.type_data.content)
				fieldsCheck.push('Content is not provided!');

			// const formattedValues = values;

			if (props.type === 'blog') {
				if (props.type_data.title.replace(/\s{2,}/g, '').length < 20)
					fieldsCheck.push('Title is less than 25 characters.');
				else if (props.type_data.title.replace(/\s{2,}/g, '').length > 120)
					fieldsCheck.push('Title is more than 120 characters.');

				// if (props.type_data.slug.replace(/\s{2,}/g, '').length < 25)
				// 	fieldsCheck.push('Slug is less than 25 characters.');

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
				// else if (props.type_data.description.length > 160)
				// 	fieldsCheck.push('Description is more than 160 characters.');

				if (
					!props.type_data.content ||
					props.type_data.content.replace(/\s{2,}/g, '').length < 25
				)
					fieldsCheck.push('Content is less than 25 characters.');
			} else {
				if (props.type_data.content.replace(/\s{2,}/g, '').length < 2)
					fieldsCheck.push('Content is less than 2 characters.');
			}

			if (fieldsCheck.length > 0) {
				// setInputsError(fieldsCheck);
				return fieldsCheck;
			} else {
				await createNewsItem(newsDataDispatch, {
					newNewsItemAuthorData: {
						author_bio: userData.bio || '',
						author_first_name: userData.first_name,
						author_last_name: userData.last_name,
						author_id: userData.id,
						author_profile_picture: userData.profile_picture || '',
						author_user_name_id: userData.user_name_id,
					},
					newsItemBasicData: {
						type: props.type,
						basics: props.type_data,
					} as ICreateNewsItemReqArgs['bodyContent']['newsItemBasicData'],
					token: userToken,
				});
			}
		};

	return (
		<NewsItemActionModal
			modalVisibilityHandler={modalVisibilityHandler}
			isModalVisible={isModalVisible}
			HeaderComponent={
				<header>
					<p className='heading-2'>Create News</p>
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

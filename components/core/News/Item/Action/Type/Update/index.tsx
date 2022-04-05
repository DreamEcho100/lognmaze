import { TNewsItemData } from '@coreLib/ts/global';
import { THandleSubmitForCreateAndUpdateNewsItemActionType } from '../../ts';
import { IUpdateNewsItemReqArgs } from '@coreLib/networkReqArgs/_app/news/[news_id]/ts';
import { useNewsSharedState } from '@store/NewsContext';
import { updateNewsItem } from '@store/NewsContext/actions';
import { differenceBetweenTwoArrays } from '@commonLibIndependent/array';

import NewsItemActionModal from '../../UI/Modal';
import NewsItemFormTypeBlog from '../../UI/Form/Type/Blog';
import NewsItemFormTypePost from '../../UI/Form/Type/Post';

interface IProps {
	newsItemData: TNewsItemData;
	userToken?: string;
	modalVisibilityHandler: (isModalVisible?: boolean | undefined) => void;
	isModalVisible: boolean;
}

const NewsItemActionTypeUpdate = ({
	newsItemData,
	userToken,
	modalVisibilityHandler,
	isModalVisible,
}: // ...props
IProps) => {
	const [
		{
			actions: { items: itemsActions },
		},
		newsDispatch,
	] = useNewsSharedState();

	// const getTypeBlogContent =
	// 	itemsActions[newsItemData.news_id]?.requests?.init?.modal
	// 		?.getTypeBlogContent;

	const handleSubmit: THandleSubmitForCreateAndUpdateNewsItemActionType =
		async (newsDispatch, props) => {
			// if (createItemRequest?.isLoading) return;

			const fieldsCheck: string[] = [];

			if (!props.type_data?.content)
				fieldsCheck.push('Content is not provided!');

			// const formattedValues = values;

			if (props.type === 'blog') {
				if (props.type_data?.title.replace(/\s{2,}/g, '').length < 20)
					fieldsCheck.push('Title is less than 25 characters.');
				else if (props.type_data?.title.replace(/\s{2,}/g, '').length > 120)
					fieldsCheck.push('Title is more than 120 characters.');

				// if (props.type_data?.slug.replace(/\s{2,}/g, '').length < 25)
				// 	fieldsCheck.push('Slug is less than 25 characters.');

				if (props.type_data?.tags.length < 2)
					fieldsCheck.push('At least there should be 2 tags.');
				else if (props.type_data?.tags.length > 10)
					fieldsCheck.push("Tags shouldn't be more than 10.");

				if (props.type_data?.image_alt.replace(/\s{2,}/g, '').length < 3)
					fieldsCheck.push('Image title is less than 3 characters.');
				else if (props.type_data?.image_alt.replace(/\s{2,}/g, '').length > 150)
					fieldsCheck.push('Image title is more than 150 characters.');

				if (props.type_data?.image_src.replace(/\s/g, '').length === 0)
					fieldsCheck.push('There is no image source.');
				if (!props.type_data?.image_src.replace(/\s/g, '').startsWith('https'))
					fieldsCheck.push("Image source doesn't start with https.");

				if (props.type_data?.description.replace(/\s{2,}/g, '').length < 25)
					fieldsCheck.push('Description is less than 25 characters.');
				else if (props.type_data?.description.length > 500)
					fieldsCheck.push('Description is more than 500 characters.');

				if (!props.type_data.content) fieldsCheck.push('No content provided!');
				else {
					if (props.type_data.content.replace(/\s{2,}/g, '').length < 25)
						fieldsCheck.push('Content is less than 25 characters.');
					else if (props.type_data.content.length > 40000)
						fieldsCheck.push('Content is more than 40000 characters.');
				}
			} else {
				if (!props.type_data.content) fieldsCheck.push('No content provided!');
				else {
					if (props.type_data.content.replace(/\s{2,}/g, '').length < 25)
						fieldsCheck.push('Content is less than 25 characters.');
					else if (props.type_data.content.length > 40000)
						fieldsCheck.push('Content is more than 40000 characters.');
				}
			}

			if (fieldsCheck.length > 0) {
				return fieldsCheck;
			} else {
				// await createNewsItem(newsDispatch, {
				// 	newNewsItemAuthorData: {
				// 		author_bio: userData.bio || '',
				// 		author_first_name: userData.first_name,
				// 		author_last_name: userData.last_name,
				// 		author_id: userData.id,
				// 		author_profile_picture: userData.profile_picture || '',
				// 		author_user_name_id: userData.user_name_id,
				// 	},
				// 	newsItemBasicData: {
				// 		type: props.type,
				// 		type_data: props.type_data,
				// 	} as ICreateNewsItemReqArgs['bodyContent']['newsItemBasicData'],
				// 	token: userToken,
				// });
				const bodyContent: IUpdateNewsItemReqArgs['bodyContent'] = {
					type: props.type,
					dataToUpdate: {},
				};

				if (
					props.type === 'post' &&
					newsItemData.type === 'post' &&
					bodyContent.type === 'post'
				) {
					let item: keyof typeof props.type_data;
					for (item in props.type_data) {
						if (
							props.type_data[item]?.trim() !==
							newsItemData.type_data[item]?.trim()
						) {
							bodyContent.dataToUpdate[item] = props.type_data[item];
						}
					}
				} else if (
					props.type === 'blog' &&
					newsItemData.type === 'blog' &&
					bodyContent.type === 'blog'
				) {
					let item: keyof typeof props.type_data;
					for (item in props.type_data) {
						if (
							// !Array.isArray(props.type_data[item]) &&
							typeof props.type_data[item] === 'string' &&
							!['tags', 'slug', 'type'].includes(item) &&
							(props.type_data[item] as string)?.trim() !==
								(newsItemData.type_data[item] as string)?.trim()
						) {
							// @ts-ignore
							bodyContent.dataToUpdate[item] = props.type_data[item];
						} else {
							if (item === 'tags') {
								const changedTags: typeof bodyContent.dataToUpdate.tags = {};
								const { added: addedTags, removed: removedTags } =
									differenceBetweenTwoArrays(
										newsItemData.type_data.tags,
										props.type_data.tags,
										{
											noDuplicates: true,
										}
									);

								if (addedTags.length !== 0) changedTags.added = addedTags;
								if (removedTags.length !== 0) changedTags.removed = removedTags;
								if (changedTags.added || changedTags.removed) {
									bodyContent.dataToUpdate.tags = changedTags;
								}
							}
						}
					}
				}

				if (
					!bodyContent.dataToUpdate ||
					Object.keys(bodyContent.dataToUpdate).length === 0
				)
					return ['Nothing Changed!'];

				await updateNewsItem(newsDispatch, {
					news_id: newsItemData.news_id,
					token: userToken,
					bodyContent,
				});
				modalVisibilityHandler();
				/*
				 */
			}
		};

	return (
		<NewsItemActionModal
			modalVisibilityHandler={modalVisibilityHandler}
			isModalVisible={isModalVisible}
			HeaderComponent={
				<header>
					<h2>Update News</h2>
				</header>
			}
			BodyComponent={
				<>
					{newsItemData.type === 'blog' && (
						<NewsItemFormTypeBlog
							handleSubmit={handleSubmit}
							actionType='update'
							newsItemType={newsItemData.type}
							newsItemData={newsItemData}
							isLoadingContentProps={{
								isModalVisible,
								newsItemData,
							}}
						/>
					)}
					{newsItemData.type === 'post' && (
						<NewsItemFormTypePost
							handleSubmit={handleSubmit}
							actionType='update'
							newsItemType={newsItemData.type}
							newsItemData={newsItemData}
							isLoadingContentProps={{
								isModalVisible,
								newsItemData,
							}}
						/>
					)}
				</>
			}
		/>
	);
};

export default NewsItemActionTypeUpdate;

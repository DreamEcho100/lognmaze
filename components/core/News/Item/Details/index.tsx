import { FC, useEffect } from 'react';

import { TNewsItemData } from '@coreLib/ts/global';

import NewsItemContentDetails from './Content';
import NewsItemDescriptionDetails from './Description';
import { useNewsSharedState } from '@store/NewsContext';
import { initGetNewsItemTypeBlogContent } from '@store/NewsContext/actions';

interface IDetailsType_MapDescriptionProps {
	details: string;
	newsItemType: TNewsItemData['type'];
	newsItemData: TNewsItemData;
	handleSetIsModalVisible: (isModelShown: boolean) => void;
}
interface IDetailsType_MapContentProps {
	details: string;
	newsItemType: TNewsItemData['type'];
	newsItemData: TNewsItemData;
	handleSetIsModalVisible: (isModelShown: boolean) => void;
}

interface IDetailsType_Map {
	description: (props: IDetailsType_MapDescriptionProps) => JSX.Element;
	content: (props: IDetailsType_MapContentProps) => JSX.Element;
}

interface INewsItemDetails {
	newsItemData: TNewsItemData;
	handleSetIsModalVisible: (isModalVisible: boolean) => void;
	isThisAModal?: boolean;
	newsItemDetailsType: 'description' | 'content';
	newsItemModelDetailsType: 'content' | 'description';
}

const NotFound = () => <h2>Not Found</h2>;

const DetailsType_Map: IDetailsType_Map = {
	description: ({ details, handleSetIsModalVisible }) => (
		<NewsItemDescriptionDetails
			description={details}
			handleSetIsModalVisible={handleSetIsModalVisible}
		/>
	),
	content: ({ details, newsItemData }) => (
		<NewsItemContentDetails newsItemData={newsItemData} content={details} />
	),
};

const NewsItemDetails: FC<INewsItemDetails> = ({
	handleSetIsModalVisible,
	isThisAModal,
	newsItemData,
	newsItemDetailsType,
	newsItemModelDetailsType,
}) => {
	const [
		{
			actions: { items: itemsActions },
		},
		newsDispatch,
	] = useNewsSharedState();

	const getTypeBlogContent =
		itemsActions[newsItemData.news_id]?.requests?.init?.modal
			?.getTypeBlogContent;

	const detailsType = isThisAModal
		? newsItemModelDetailsType
		: newsItemDetailsType;

	const details =
		detailsType === 'description' && newsItemData.type === 'blog'
			? newsItemData.type_data.description
			: newsItemData.type_data.content
			? newsItemData.type_data.content
			: 'The blog content is not present!';

	const DetailsType = DetailsType_Map[detailsType];
	const newsItemDetailsTypeProps = () => {
		const tempObj: {
			details: string;
			newsItemType: TNewsItemData['type'];
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			[key: string]: any;
		} = {
			newsItemType: newsItemData.type,
			details,
		};
		if (detailsType === 'description') {
			tempObj.handleSetIsModalVisible = handleSetIsModalVisible;
			return tempObj as unknown as IDetailsType_MapDescriptionProps;
		}

		tempObj.newsItemData = newsItemData;
		return tempObj as unknown as IDetailsType_MapContentProps;
	};

	useEffect(() => {
		if (!newsItemData.news_id) return;

		if (
			isThisAModal &&
			newsItemData.type === 'blog' &&
			!newsItemData.type_data.content &&
			(!getTypeBlogContent ||
				(getTypeBlogContent &&
					!getTypeBlogContent.success &&
					!getTypeBlogContent.isLoading))
		) {
			if (!getTypeBlogContent || !getTypeBlogContent?.error) {
				initGetNewsItemTypeBlogContent(newsDispatch, {
					news_id: newsItemData.news_id,
					urlOptions: {
						params: {
							news_id: newsItemData.news_id,
						},
					},
				});
			} else {
				console.warn('Error with loading the content!');
			}
			return;
		}
	}, [
		getTypeBlogContent,
		isThisAModal,
		newsDispatch,
		newsItemData.news_id,
		newsItemData.type,
		newsItemData.type_data.content,
	]);

	if (!newsItemData.news_id) return <NotFound />;

	return <DetailsType {...newsItemDetailsTypeProps()} />;
};

export default NewsItemDetails;

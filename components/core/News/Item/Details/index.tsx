import { FC } from 'react';

import classes from './index.module.css';

import { TNewsItemData } from '@coreLib/ts/global';

import NewsItemContentDetails from './Content';
import NewsItemDescriptionDetails from './Description';
// import { useNewsSharedState } from '@store/newsContext';

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
	description: (props: IDetailsType_MapDescriptionProps) => JSX.Element; // typeof NewsItemDescriptionDetails;
	content: (props: IDetailsType_MapContentProps) => JSX.Element; // typeof NewsItemContentDetails;
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
	description: ({ details, newsItemType, handleSetIsModalVisible }) => (
		<NewsItemDescriptionDetails
			description={details}
			newsItemType={newsItemType}
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
	// const [
	// 	{
	// 		data: { newsExtra: newsExtraData },
	// 		actions: { items: newsItemsActions },
	// 	},
	// ] = useNewsSharedState();

	// const newsItemDetailsType = newsExtraData[newsItemData.news_id]?.newsItemDetailsType;
	// const newsItemModelDetailsType = newsExtraData[newsItemData.news_id]?.newsItemModelDetailsType;

	const detailsType = isThisAModal
		? newsItemModelDetailsType
		: newsItemDetailsType;

	const details =
		detailsType === 'description' && newsItemData.type === 'blog'
			? newsItemData.type_data.description
			: newsItemData.type_data.content
			? newsItemData.type_data.content
			: 'The blog content is not present!';

	if (!newsItemData.news_id) return <NotFound />;

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
		// :
		// | IDetailsType_MapDescriptionProps
		// | IDetailsType_MapContentProps
		if (detailsType === 'description') {
			tempObj.handleSetIsModalVisible = handleSetIsModalVisible;
			return tempObj as unknown as IDetailsType_MapDescriptionProps;
		}

		// if (detailsType === 'content') {
		// }
		tempObj.newsItemData = newsItemData;
		return tempObj as unknown as IDetailsType_MapContentProps;
	};

	return <DetailsType {...newsItemDetailsTypeProps()} />;
};

export default NewsItemDetails;

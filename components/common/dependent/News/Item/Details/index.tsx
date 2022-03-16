import { FC } from 'react';

import classes from './index.module.css';

import { TNewsItemData } from '@coreLib/ts/global';

import NewsItemContentDetails from './Content';
import NewsItemDescriptionDetails from './Description';
import FormatContainer from '@commonComponentsIndependent/Format/Container';
import { useNewsItemSharedState } from '@store/newsContext/Item';

interface IDetailsType_MapDescriptionProps {
	details: string;
	newsItemType: TNewsItemData['type'];
	handleSetIsModalVisible: (isModelShown: boolean) => void;
}
interface IDetailsType_MapContentProps {
	details: string;
	newsItemType: TNewsItemData['type'];
	handleSetIsModalVisible: (isModelShown: boolean) => void;
}

interface IDetailsType_Map {
	description: (props: IDetailsType_MapDescriptionProps) => JSX.Element; // typeof NewsItemDescriptionDetails;
	content: (props: IDetailsType_MapContentProps) => JSX.Element; // typeof NewsItemContentDetails;
}

interface INewsItemDetails {
	handleSetIsModalVisible: (isModalVisible: boolean) => void;
	isThisAModal?: boolean;
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
	content: ({ details, newsItemType }) => (
		<NewsItemContentDetails content={details} />
	),
};

const NewsItemDetails: FC<INewsItemDetails> = ({
	handleSetIsModalVisible,
	isThisAModal,
	// isLoadingContent,
}) => {
	const [
		{
			data: {
				newsItem: newsItemData,
				// hit_comments_limit,
				newsItemDetailsType,
				newsItemModelDetailsType,
			},
		},
	] = useNewsItemSharedState();

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
			return tempObj as IDetailsType_MapDescriptionProps;
		}

		return tempObj as IDetailsType_MapContentProps;
	};

	return (
		<FormatContainer className={classes.details}>
			<DetailsType {...newsItemDetailsTypeProps()} />
		</FormatContainer>
	);
};

export default NewsItemDetails;

import { FC } from 'react';

// import classes from './index.module.css';

import { TNewsItemData } from '@coreLib/ts/global';
import { useNewsSharedState } from '@store/NewsContext';

import NewsItemHeaderNav from './Nav';
import TimeAndDate from '../TimeAndDate';
import NewsItemHeaderBlogInfo from './BlogInfo';

interface Props {
	newsItemData: TNewsItemData;
	hideHeaderSettings?: boolean;
}

const NewsItemHeader: FC<Props> = ({ newsItemData, hideHeaderSettings }) => {
	const [
		{
			data: { newsExtra },
			actions: { items: newsItemsActions },
		},
	] = useNewsSharedState();

	const newsItemDetailsType =
		newsExtra[newsItemData.news_id]?.newsItemDetailsType;
	const priorityForHeaderImage =
		!!newsItemsActions[newsItemData.news_id]?.priorityForHeaderImage;
	if (
		newsItemData.type === 'blog' &&
		newsItemDetailsType !== 'description' &&
		newsItemDetailsType !== 'content'
	)
		return <>Missing &quot;newsItemDetailsType&quot;</>;

	return (
		<header>
			<NewsItemHeaderNav
				newsItemData={newsItemData}
				hideHeaderSettings={hideHeaderSettings}
				priorityForHeaderImage={priorityForHeaderImage}
			/>
			<div>
				<TimeAndDate
					created_at={newsItemData.created_at}
					updated_at={newsItemData.updated_at}
				/>
				{newsItemData.type === 'blog' && (
					<NewsItemHeaderBlogInfo
						newsItemBlogData={newsItemData}
						newsItemDetailsType={newsItemDetailsType}
						priorityForHeaderImage={priorityForHeaderImage}
					/>
				)}
			</div>
		</header>
	);
};

export default NewsItemHeader;

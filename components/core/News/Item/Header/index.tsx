import { FC } from 'react';

// import classes from './index.module.css';

import { TNewsItemData } from '@coreLib/ts/global';
import { useNewsSharedState } from '@store/newsContext';

import NewsItemHeaderNav from './Nav';
import TimeAndDate from '../TimeAndDate';
import NewsItemHeaderBlogInfo from './BlogInfo';

interface Props {
	newsItemData: TNewsItemData;
}

const NewsItemHeader: FC<Props> = ({ newsItemData }) => {
	const [
		{
			// data: { newsItem: newsItemData, newsItemDetailsType },
			data: { newsExtra },
			actions: { items: newsItemsActions },
		},
	] = useNewsSharedState();

	const newsItemDetailsType =
		newsExtra[newsItemData.news_id].newsItemDetailsType;
	const priorityForHeaderImage =
		!!newsItemsActions[newsItemData.news_id]?.init?.priorityForHeaderImage;
	if (
		newsItemData.type === 'blog' &&
		newsItemDetailsType !== 'description' &&
		newsItemDetailsType !== 'content'
	)
		return <>Missing &quot;newsItemDetailsType&quot;</>;

	return (
		<header>
			<NewsItemHeaderNav newsItemData={newsItemData} />
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

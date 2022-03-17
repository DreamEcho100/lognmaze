import { FC } from 'react';

// import classes from './index.module.css';

import { useNewsItemSharedState } from '@store/newsContext/Item';

import NewsItemHeaderNav from './Nav';
import TimeAndDate from '../TimeAndDate';
import NewsItemHeaderBlogInfo from './BlogInfo';

interface Props {
	priorityForHeaderImage: boolean;
}

const NewsItemHeader: FC<Props> = ({ priorityForHeaderImage }) => {
	const [
		{
			data: { newsItem: newsItemData, newsItemDetailsType },
		},
	] = useNewsItemSharedState();

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

import { useMemo } from 'react';

import { useUserSharedState } from '@store/UserContext';
import Nav from './Nav';
import TimeAndDate from './TimeAndDate';
import NewsArticleInfo from './NewsArticleInfo';

const NewsHeader = ({
	newsItemData,
	detailsType,
	isLoadingSkeleton,
	setShowModal,
	hideHeaderSettings,
}) => {
	const [userState, userDispatch] = useUserSharedState();

	const isDataOwner = useMemo(() => {
		return (
			!isLoadingSkeleton &&
			userState.user?.user_name_id === newsItemData?.author_user_name_id
		);
	}, [isLoadingSkeleton, userState?.user?.user_name_id]);

	console.log('isDataOwner', isDataOwner);

	return (
		<header>
			<Nav
				isDataOwner={isDataOwner}
				newsItemData={newsItemData}
				isLoadingSkeleton={isLoadingSkeleton}
				hideHeaderSettings={hideHeaderSettings}
			/>
			<section>
				<TimeAndDate
					setShowModal={setShowModal}
					created_at={newsItemData?.created_at}
					updated_at={newsItemData?.updated_at}
					isLoadingSkeleton={isLoadingSkeleton}
				/>
				{newsItemData.type === 'article' && (
					<NewsArticleInfo
						newsItemData={newsItemData}
						isLoadingSkeleton={isLoadingSkeleton}
						detailsType={detailsType}
						setShowModal={setShowModal}
					/>
				)}
			</section>
		</header>
	);
};

export default NewsHeader;
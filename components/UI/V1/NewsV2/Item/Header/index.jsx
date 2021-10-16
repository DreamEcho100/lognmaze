import { useContext, useEffect, useState } from 'react';

import UserContext from '@store/UserContext';
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
	const { state: userState } = useContext(UserContext);

	const [isDataOwner, setIsDataOwner] = useState(false);

	useEffect(() => {
		if (userState?.user?.user_name_id === newsItemData?.author_user_name_id) {
			setIsDataOwner(true);
		} else if (isDataOwner) {
			setIsDataOwner(false);
		}
	}, [userState.user]);

	return (
		<header>
			<Nav
				isDataOwner={isDataOwner}
				newsItemData={newsItemData}
				isLoadingSkeleton={isLoadingSkeleton}
				hideSettings={hideHeaderSettings}
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

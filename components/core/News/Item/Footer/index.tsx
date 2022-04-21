import { FC, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import { TNewsItemData } from '@coreLib/ts/global';

const DynamicComments = dynamic(() => import('./Comments'), {
	ssr: false,
});
import Status from './Status';
import { memo } from 'react-tracked';
import { useNewsItemExtraDataSharedState } from '../context';

interface IProps {
	hideFooterSettings?: boolean;

	news_id: TNewsItemData['news_id'];
}

const NewsItemFooter: FC<IProps> = ({ news_id }) => {
	const footerRef = useRef<HTMLDivElement>(null);

	const [isCommentsVisible, setIsCommentsVisible] = useState(false);

	const [
		{
			data: { comments, comments_counter, hit_comments_limit },
		},
	] = useNewsItemExtraDataSharedState();

	const handleSetIsCommentsVisible = (isCommentsVisible?: boolean) => {
		if (isCommentsVisible) return setIsCommentsVisible(isCommentsVisible);
		setIsCommentsVisible((prevState) => !prevState);
	};

	if (!news_id) {
		return <></>;
	}

	return (
		<footer ref={footerRef}>
			<Status
				comments_counter={comments_counter}
				isCommentsVisible={isCommentsVisible}
				handleSetIsCommentsVisible={handleSetIsCommentsVisible}
			/>
			{/* {!hideFooterSettings && (
				<Settings
					newsItemData={newsItemData}
					comments={comments}
					user_vote_type={user_vote_type}
					setIsCommentsVisible={setIsCommentsVisible}
					setFocusCommentTextarea={setFocusCommentTextarea}
					isCommentsVisible={isCommentsVisible}
					focusCommentTextarea={focusCommentTextarea}
					isLoadingUserVote={isLoadingUserVote}
				/>
			)} */}
			{isCommentsVisible && (
				<DynamicComments
					newsItemComments={comments || []}
					handleSetIsCommentsVisible={handleSetIsCommentsVisible}
					isCommentsVisible={isCommentsVisible}
					news_id={news_id}
					comments_counter={comments_counter}
					hit_comments_limit={hit_comments_limit}
					comments={comments}
				/>
			)}
		</footer>
	);
};

export default memo(NewsItemFooter);

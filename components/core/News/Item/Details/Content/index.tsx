import { FC } from 'react';

import { TNewsItemData } from '@coreLib/ts/global';
import { useNewsSharedState } from '@store/NewsContext';

import MdToHTMLFormatter from '@commonComponentsDependent/Format/MdToHTML';

interface Props {
	content: string;
	newsItemData: TNewsItemData;
}

const NewsItemContentDetails: FC<Props> = ({ newsItemData, content }) => {
	const [
		{
			actions: {
				items: itemsActions,
				// init: {
				// 	modal: { getTypeBlogContent },
				// },
			},
		},
	] = useNewsSharedState();

	const getTypeBlogContent =
		itemsActions[newsItemData.news_id]?.requests?.init?.modal
			?.getTypeBlogContent;

	const showContent = !!(
		(!getTypeBlogContent && content) ||
		(getTypeBlogContent &&
			!getTypeBlogContent.isLoading &&
			!getTypeBlogContent.error)
	);

	// return <></>;

	return (
		<>
			{getTypeBlogContent?.error && (
				<p className='errorMessage'>{getTypeBlogContent.error}</p>
			)}
			{getTypeBlogContent?.isLoading && (
				<p className='isLoadingLoader'>Loading...</p>
			)}
			{showContent && <MdToHTMLFormatter content={content} />}
		</>
	);
};

export default NewsItemContentDetails;

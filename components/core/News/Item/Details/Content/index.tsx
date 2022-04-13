import { FC } from 'react';

import classes from './index.module.css';

import { TNewsItemData } from '@coreLib/ts/global';
import { useNewsSharedState } from '@store/NewsContext';

import MdToHTMLFormatter from '@commonComponentsDependent/Format/MdToHTML';
import FormatContainer from '@commonComponentsIndependent/Format/Container';

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
		<FormatContainer className={classes.formatContainer}>
			{getTypeBlogContent?.error && (
				<p className='errorMessage'>{getTypeBlogContent.error}</p>
			)}
			{getTypeBlogContent?.isLoading && (
				<p className='isLoadingLoader'>Loading...</p>
			)}
			{showContent && <MdToHTMLFormatter content={content} />}
		</FormatContainer>
	);
};

export default NewsItemContentDetails;

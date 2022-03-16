import { FC } from 'react';
import { useNewsItemSharedState } from '@store/newsContext/Item';

import MdToHTMLFormatter from '@commonComponentsDependent/Format/MdToHTML';

interface Props {
	content: string;
}

const NewsItemContentDetails: FC<Props> = ({ content }) => {
	const [
		{
			actions: {
				init: {
					modal: { getTypeBlogContent },
				},
			},
		},
	] = useNewsItemSharedState();

	return (
		<>
			{getTypeBlogContent.error && (
				<p className='errorMessage'>{getTypeBlogContent.error}</p>
			)}
			{getTypeBlogContent.isLoading && (
				<p className='isLoadingLoader'>Loading...</p>
			)}
			{!getTypeBlogContent.isLoading && !getTypeBlogContent.error && (
				<MdToHTMLFormatter content={content} />
			)}
		</>
	);
};

export default NewsItemContentDetails;

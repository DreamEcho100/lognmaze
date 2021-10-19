import classes from './index.module.css';

import FormatterContainer from '@components/UI/V1/Format/Container';
import Content from './Content';
import Description from './Description';

const NotFound = () => <h2>Not Found</h2>;

const LoadingSkeleton = ({ isLoadingSkeleton }) => (
	<section
		className={`${classes.details} ${
			isLoadingSkeleton ? `${classes.isLoadingSkeleton} skeleton-loading` : ''
		}`}
	></section>
);

const DetailsType_Map = {
	description: ({ details, newsItemType, setShowModal }) => (
		<Description
			description={details}
			newsItemType={newsItemType}
			setShowModal={setShowModal}
		/>
	),
	content: ({ details, newsItemType }) => (
		<Content content={details} newsItemType={newsItemType} />
	),
};

const NewsItemDetails = ({
	details,
	detailsType,
	newsItemType,
	newsItemId,
	isLoadingSkeleton,
	setShowModal,
	isLoadingContent,
}) => {
	if (!isLoadingSkeleton && !newsItemId) return <NotFound />;

	if (
		isLoadingSkeleton ||
		(newsItemType === 'article' &&
			detailsType === 'content' &&
			isLoadingContent)
	) {
		return <LoadingSkeleton isLoadingSkeleton={isLoadingSkeleton} />;
	}

	const DetailsType = DetailsType_Map[detailsType];
	const detailsTypeProps = {
		newsItemType,
		details,
	};

	if (detailsType === 'description')
		detailsTypeProps.setShowModal = setShowModal;

	return (
		<FormatterContainer className={classes.details}>
			<DetailsType {...detailsTypeProps} />
		</FormatterContainer>
	);
};

export default NewsItemDetails;

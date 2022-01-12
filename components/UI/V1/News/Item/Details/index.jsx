import { memo, useEffect, useState } from 'react';

import classes from './index.module.css';

import FormatterContainer from '@components/UI/V1/Format/Container';
import Content from './Content';
import Description from './Description';

const NotFound = () => <p className='heading-2'>Not Found</p>;

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
		(newsItemType === 'blog' &&
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

const newsDetailsPropsAreEqual = (prevNewsDetails, nextNewsDetails) => {
	return (
		prevNewsDetails.details === nextNewsDetails.details &&
		prevNewsDetails.isLoadingSkeleton === nextNewsDetails.isLoadingSkeleton &&
		prevNewsDetails.isLoadingContent === nextNewsDetails.isLoadingContent
	);
};

const MemoizedNewsDetails = memo(NewsItemDetails, newsDetailsPropsAreEqual);

export default MemoizedNewsDetails;

import NewsHeader from '@components/UI/V1/News/Header';
import Details from '@components/UI/V1/News/Details/Details';
import NewsFooter from '@components/UI/V1/News/Footer';

const ContainerItems = ({
	blogProps = {},
	newsItem,
	isLoadingSkeleton,
	detailsType,
	setShowModal,
	setIsLoadingContent,
	hideFooterSettings,
	isLoadingContent,
	isLoadingUserVote,
	...props
}) => {
	return (
		<blog {...blogProps}>
			<NewsHeader
				newsItem={newsItem}
				isLoadingSkeleton={isLoadingSkeleton}
				detailsType={detailsType}
				setShowModal={setShowModal}
				hideHeaderSettings={props.hideHeaderSettings}
				setIsLoadingContent={setIsLoadingContent}
				isLoadingContent={isLoadingContent}
			/>
			<Details
				newsItem={newsItem}
				isLoadingSkeleton={isLoadingSkeleton}
				detailsType={detailsType}
				setShowModal={setShowModal}
				isLoadingContent={isLoadingContent}
			/>
			<NewsFooter
				hideFooterSettings={hideFooterSettings}
				newsItem={newsItem}
				isLoadingSkeleton={isLoadingSkeleton}
				isLoadingUserVote={isLoadingUserVote}
			/>
		</blog>
	);
};

export default ContainerItems;

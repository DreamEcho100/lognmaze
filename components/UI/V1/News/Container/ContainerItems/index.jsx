import NewsHeader from '@components/UI/V1/News/Header/Header';
import Details from '@components/UI/V1/News/Details/Details';
import NewsFooter from '@components/UI/V1/News/Footer';

const ContainerItems = ({
	articleProps = {},
	newsItem,
	detailsType,
	setShowModal,
	setIsLoadingContent,
	isLoadingContent,
	isLoadingUserVote,
	...props
}) => {
	return (
		<article {...articleProps}>
			<NewsHeader
				newsItem={newsItem}
				setShowModal={setShowModal}
				hideHeaderSettings={props.hideHeaderSettings}
				setIsLoadingContent={setIsLoadingContent}
				isLoadingContent={isLoadingContent}
			/>
			<Details
				newsItem={newsItem}
				detailsType={detailsType}
				setShowModal={setShowModal}
				isLoadingContent={isLoadingContent}
			/>
			<NewsFooter newsItem={newsItem} isLoadingUserVote={isLoadingUserVote} />
		</article>
	);
};

export default ContainerItems;

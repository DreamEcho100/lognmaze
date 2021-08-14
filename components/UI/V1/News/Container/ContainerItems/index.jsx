// import classes from './index.module.css';

import Wrapper from '@components/UI/V1/Wrapper';
import NewsHeader from '@components/UI/V1/News/Header/Header';
import Details from '@components/UI/V1/News/Details/Details';
import NewsFooter from '@components/UI/V1/News/Footer';

const ContainerItems = ({
	articleProps = {},
	data,
	setData,
	detailsType,
	setShowModal,
	setIsLoadingContent,
	isLoadingContent,
	isLoadingReactions,
	// props.hideHeaderSettings,
	...props
}) => {
	return (
		<Wrapper extraClasses='full-width'>
			<article {...articleProps}>
				<NewsHeader
					data={data}
					setData={setData}
					setShowModal={setShowModal}
					hideHeaderSettings={props.hideHeaderSettings}
					setIsLoadingContent={setIsLoadingContent}
					isLoadingContent={isLoadingContent}
				/>
				<Details
					data={data}
					setData={setData}
					detailsType={detailsType}
					setShowModal={setShowModal}
					isLoadingContent={isLoadingContent}
				/>
				<NewsFooter
					data={data}
					setData={setData}
					isLoadingReactions={isLoadingReactions}
				/>
			</article>
		</Wrapper>
	);
};

export default ContainerItems;

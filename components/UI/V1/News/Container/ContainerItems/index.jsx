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
	isLoadingUserVote,
	// props.hideHeaderSettings,
	...props
}) => {
	return (
		<Wrapper
			style={{
				width: '100%',
				maxWidth: '100rem',
				marginLeft: 'auto',
				marginRight: 'auto',
			}}
			extraClasses='full-width'
		>
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
					isLoadingUserVote={isLoadingUserVote}
				/>
			</article>
		</Wrapper>
	);
};

export default ContainerItems;

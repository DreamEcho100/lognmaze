// import classes from './index.module.css';

import { NewsContextProvider } from '@store/NewsContext';

import Container from '@components/UI/V1/News/Container/Container';
import Wrapper from '@components/UI/V1/Wrapper';

const OneNewsContent = ({ data }) => {
	const articleProps = {
		data: data,
		detailsType: 'content',
		loadingUserVote: true,
		isContainerContentOnView: true,
	};

	return (
		<main className='main'>
			<section
				style={{
					width: '100%',
					maxWidth: '100rem',
					margin: 'auto',
				}}
			>
				<NewsContextProvider>
					<Wrapper>
						<Container {...articleProps} />
					</Wrapper>
				</NewsContextProvider>
			</section>
		</main>
	);
};

export default OneNewsContent;

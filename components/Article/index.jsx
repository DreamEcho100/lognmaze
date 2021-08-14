// import classes from './index.module.css';

import { NewsContextProvider } from '@store/NewsContext';

import Container from '@components/UI/V1/News/Container/Container';

const Article = ({ articleProps }) => {
	return (
		<main id='main'>
			<section>
				<NewsContextProvider>
					<Container {...articleProps} />
				</NewsContextProvider>
			</section>
		</main>
	);
};

export default Article;

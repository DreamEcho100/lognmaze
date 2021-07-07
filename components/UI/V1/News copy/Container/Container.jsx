import { useEffect, useState } from 'react';

import NewsHeader from '../Header/Header';
import Details from '../Details/Container';

const Container = ({ data }) => {
	const [author, setAuthor] = useState(data.author);
	const [news, setNews] = useState(data.news);

	// useEffect(() => { }, [data.author]);

	return (
		<article>
			<NewsHeader author={author} news={news} setNews={setNews} />
			<Details news={news} />
		</article>
	);
};

export default Container;

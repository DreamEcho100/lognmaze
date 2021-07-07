import { useEffect, useState } from 'react';

import NewsHeader from '../NewsHeader/NewsHeader';
import NewsDetails from '../NewsDetails/NewsDetails';

const NewsContainer = ({ data }) => {
	const [author, setAuthor] = useState(data.author);
	const [news, setNews] = useState(data.news);

	// useEffect(() => { }, [data.author]);

	return (
		<article>
			<NewsHeader author={author} news={news} setNews={setNews} />
			<NewsDetails news={news} />
		</article>
	);
};

export default NewsContainer;
